import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/layout'
import { Flex, Text } from '@chakra-ui/layout'

import { getDateAndTime } from '../utils'
import DeleteMessageButton from './DeleteMessageButton'
import { MessageType } from './MessagesList'

interface IMessageProps {
  message: MessageType
  folder: string | undefined
  updateList: () => void
}

const Message: React.FC<IMessageProps> = ({
  message,
  folder,
  updateList,
}: IMessageProps) => {
  const { id, title, sent, sender, receiver } = message
  const [messageHovered, setMessageHovered] = useState<boolean>(false)

  const toggleDeleteIcon = () => setMessageHovered(!messageHovered)

  return (
    <Flex
      w='100%'
      bg='gray.100'
      shadow={messageHovered ? 'md' : 'none'}
      mb='2'
      onMouseEnter={toggleDeleteIcon}
      onMouseLeave={toggleDeleteIcon}
    >
      <Flex
        direction='column'
        bg='gray.300'
        p='2'
        mr='2'
        fontSize='xs'
        w='100px'
      >
        <Text w='100%'>From: {sender}</Text>
        <Text>To: {receiver}</Text>
      </Flex>
      <Box w='100%' alignSelf='center'>
        <Link to={`/messages/${folder}/${id}`}>
          <Flex
            justifyContent='space-between'
            flexGrow={1}
            p='2'
            alignItems='center'
          >
            <Text fontSize='xl'>{title}</Text>
            <Text fontSize='sm'>{getDateAndTime(sent)}</Text>
          </Flex>
        </Link>
      </Box>
      {messageHovered ? (
        <DeleteMessageButton messageId={id} updateList={updateList} />
      ) : (
        <Box w='14' />
      )}
    </Flex>
  )
}

export default Message
