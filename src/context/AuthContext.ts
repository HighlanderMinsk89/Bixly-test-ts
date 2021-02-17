import { createContext } from 'react'

export interface IAuthContext {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const noop = () => {}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
})
