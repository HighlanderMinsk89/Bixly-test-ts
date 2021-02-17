import * as React from 'react'
import { ChakraProvider, theme, Flex } from '@chakra-ui/react'
import { useAuth } from './hooks/useAuth'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthContext } from './context/AuthContext'
import { useRoutes } from './routes'

export const App = () => {
  const { login, logout, token } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <Flex justifyContent='center' w='100%'>
      <ChakraProvider theme={theme}>
        <AuthContext.Provider value={{ login, logout, isAuthenticated, token }}>
          <Flex
            direction='column'
            alignItems='center'
            minW='350px'
            maxW='1000px'
            w='100%'
          >
            <Navbar />
            <Router>{routes}</Router>
          </Flex>
        </AuthContext.Provider>
      </ChakraProvider>
    </Flex>
  )
}
