import { useState, useCallback, useEffect } from 'react'

const localStorageData = 'BixlyData'

type LocalStorageData = {
  token: string
}

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null)

  const login = useCallback((apiToken: string): void => {
    setToken(apiToken)
    localStorage.setItem(localStorageData, JSON.stringify({ token: apiToken }))
  }, [])

  const logout = useCallback((): void => {
    setToken(null)
    localStorage.removeItem(localStorageData)
  }, [])

  useEffect(() => {
    const dataFromLS: string | null = localStorage.getItem(localStorageData)
    if (dataFromLS) {
      const parsedLS: LocalStorageData = JSON.parse(dataFromLS)
      if (parsedLS.token) login(parsedLS.token)
    }
  }, [login])

  return { login, logout, token } as const
}
