import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Button } from '@chakra-ui/button'
import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Heading } from '@chakra-ui/layout'

import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/useHttp'
import { useNotification } from '../hooks/useNotification'

export type LoginFormType = {
  username: string
  password: string
}

type LoginResponse = {
  token: string
}

const LoginForm = () => {
  const [formInput, setFormInput] = useState<LoginFormType>({
    username: '',
    password: '',
  })
  const { request } = useHttp()
  const { login } = useContext(AuthContext)
  const { notificate } = useNotification()
  const history = useHistory()
  const focusRef = useRef<HTMLInputElement | null>(null)

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [evt.target.name]: evt.target.value })
  }

  const onLogin = async (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    try {
      const data: LoginResponse = await request(
        'api-token-auth/',
        'post',
        formInput
      )
      login(data.token)
      history.push('/messages')
      notificate('Success!', 'You are logged in now.', 'success')
    } catch (error) {}
  }

  useEffect(() => {
    focusRef.current && focusRef.current.focus()
  }, [])

  return (
    <Box w='450px' minW='350px' alignContent='center' p='2' mt='4'>
      <Heading as='h6' size='md'>
        Please log in
      </Heading>
      <Box as='form' onSubmit={onLogin}>
        <FormControl id='user-name' isRequired>
          <Input
            ref={focusRef}
            type='text'
            variant='flushed'
            placeholder='User Name'
            name='username'
            value={formInput.username}
            onChange={handleInput}
          />
        </FormControl>
        <FormControl id='password' isRequired>
          <Input
            type='password'
            placeholder='Password'
            name='password'
            variant='flushed'
            value={formInput.password}
            onChange={handleInput}
          />
        </FormControl>
        <Button
          type='submit'
          variant='solid'
          size='sm'
          colorScheme='blue'
          mt='2'
        >
          Login
        </Button>
      </Box>
    </Box>
  )
}

export default LoginForm
