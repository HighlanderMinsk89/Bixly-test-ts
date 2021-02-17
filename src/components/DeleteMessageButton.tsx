import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { IconButton } from '@chakra-ui/button'
import { DeleteIcon } from '@chakra-ui/icons'

import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/useHttp'

export interface IParams {
  folder?: string
  id?: string
}

interface IProps {
  messageId: number
  updateList?: () => void
}

const DeleteMessageButton = ({ messageId, updateList }: IProps) => {
  const { token } = useContext(AuthContext)
  const { request } = useHttp()
  const history = useHistory()
  const { folder } = useParams<IParams>()

  const deleteMessage = async () => {
    try {
      const response = await request(
        `messages/${messageId}/`,
        'delete',
        null,
        token
      )
      if (response) {
        if (updateList) updateList()
        history.push(`/messages/${folder}`)
      }
    } catch (error) {}
  }

  return (
    <IconButton
      icon={<DeleteIcon />}
      alignSelf='center'
      colorScheme='red'
      size='sm'
      aria-label='Delete Message'
      m='2'
      onClick={deleteMessage}
    />
  )
}

export default DeleteMessageButton
