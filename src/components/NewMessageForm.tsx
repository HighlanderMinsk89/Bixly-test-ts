import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Button } from '@chakra-ui/button'
import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Flex } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/textarea'

import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/useHttp'
import { useNotification } from '../hooks/useNotification'

export type NewMessageType = {
  title: string
  body: string
  receiver: string
}

const NewMessageForm = () => {
  const [newMessageForm, setNewMessageForm] = useState<NewMessageType>({
    title: '',
    body: '',
    receiver: '',
  })
  const { request } = useHttp()
  const { token } = useContext(AuthContext)
  const { notificate } = useNotification()
  const history = useHistory()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFormChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewMessageForm({
      ...newMessageForm,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSendMessage = async (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    try {
      const response = await request('messages/', 'post', newMessageForm, token)
      if (response) {
        notificate('Success!', 'Message has been sent', 'success')
        history.push('/messages/sent')
      }
    } catch (error) {}
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <Flex w='100%' direction='column' mt='2' p='2'>
      <Box as='form' onSubmit={handleSendMessage}>
        <FormControl id='receiver' isRequired mb='2'>
          <Input
            type='text'
            variant='flushed'
            placeholder='To'
            name='receiver'
            value={newMessageForm.receiver}
            ref={inputRef}
            onChange={handleFormChange}
          />
        </FormControl>
        <FormControl id='title' isRequired mb='2'>
          <Input
            type='text'
            placeholder='Title'
            name='title'
            variant='flushed'
            value={newMessageForm.title}
            onChange={handleFormChange}
          />
        </FormControl>
        <FormControl id='title' isRequired>
          <Textarea
            type='text'
            placeholder='Type your message here'
            name='body'
            value={newMessageForm.body}
            onChange={handleFormChange}
          />
        </FormControl>

        <Button
          type='submit'
          size='sm'
          variant='solid'
          colorScheme='green'
          mr='2'
          mt='2'
        >
          Send
        </Button>

        <Button
          type='button'
          size='sm'
          variant='solid'
          colorScheme='red'
          mr='2'
          mt='2'
          onClick={() => history.goBack()}
        >
          Discard
        </Button>
      </Box>
    </Flex>
  )
}

export default NewMessageForm
