import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button } from '@chakra-ui/button'
import { Divider, Flex, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'

import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/useHttp'
import { getDateAndTime } from '../utils'
import DeleteMessageButton, { IParams } from './DeleteMessageButton'
import { MessageType } from './MessagesList'

const MessageDetails = () => {
  const [message, setMessage] = useState<MessageType | null>(null)
  const { request, loading } = useHttp()
  const { id, folder } = useParams<IParams>()
  const { token } = useContext(AuthContext)
  const history = useHistory()

  const getMessageDetails = useCallback(async () => {
    try {
      const data = await request(`messages/${id}/`, 'get', null, token)
      if (data) setMessage(data)
    } catch (error) {}
  }, [request, token, id])

  useEffect(() => {
    getMessageDetails()
  }, [getMessageDetails])

  if (loading) return <Spinner color='blue.300' emptyColor='gray.300' mt='6' />

  return (
    <Flex direction='column' w='100%' mt='2' bg='gray.100'>
      <Flex>
        <Flex
          direction='column'
          p='2'
          pr='8'
          mr='4'
          alignItems='flex-start'
          fontSize='xs'
        >
          <Text>From: {message?.sender}</Text>
          <Text>To: {message?.receiver}</Text>
        </Flex>
        <Flex
          p='2'
          pr='8'
          mr='4'
          fontSize='xs'
          justify='space-between'
          grow={1}
          alignItems='center'
        >
          <Text fontSize='xl'>{message?.title}</Text>
          <Text>{message?.sent && getDateAndTime(message.sent)}</Text>
        </Flex>
        <Flex alignItems='center'>
          {folder === 'inbox' ? (
            <Button
              colorScheme='blue'
              size='sm'
              onClick={() => history.push('/messages/compose')}
            >
              Reply
            </Button>
          ) : null}

          <DeleteMessageButton messageId={Number(id)} />
        </Flex>
      </Flex>
      <Divider />
      <Flex p='2'>
        <Text fontStyle='italic'>{message?.body}</Text>
      </Flex>
    </Flex>
  )
}

export default MessageDetails
