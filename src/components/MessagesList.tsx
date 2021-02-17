import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Heading } from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'

import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/useHttp'
import Message from './Message'
import { IParams } from './DeleteMessageButton'

export type MessageType = {
  id: number
  title: string
  body: string
  sent: string
  read: boolean
  sender: string
  receiver: string
}

const MessagesList = () => {
  const [messages, setMessages] = useState<MessageType[]>([])
  const { folder } = useParams<IParams>()
  const { request, loading } = useHttp()
  const { token } = useContext(AuthContext)

  const getMessages = useCallback(async () => {
    try {
      const url = folder === 'inbox' ? 'messages/' : 'messages/sent/'
      const data: MessageType[] = await request(url, 'get', null, token)
      setMessages(data)
    } catch (error) {}
  }, [folder, request, token])

  useEffect(() => {
    getMessages()
  }, [getMessages])

  if (!messages.length) {
    return (
      <Heading fontSize='large' mt='4'>
        No messages in {folder}
      </Heading>
    )
  }

  if (loading) return <Spinner color='blue.300' emptyColor='gray.300' mt='6' />

  return (
    <Flex direction='column' w='100%' mt='2'>
      {messages.map((message) => {
        return (
          <Message
            key={message.id}
            message={message}
            folder={folder}
            updateList={getMessages}
          />
        )
      })}
    </Flex>
  )
}

export default MessagesList
