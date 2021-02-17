import axios, { Method } from 'axios'
import { useCallback, useEffect, useState } from 'react'

import { LoginFormType } from '../components/LoginForm'
import { NewMessageType } from '../components/NewMessageForm'
import { useNotification } from './useNotification'

const baseApiUrl = 'https://messaging-test.bixly.com'

type BodyType = LoginFormType | NewMessageType | null

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [requestError, setRequestError] = useState<string | null>(null)
  const { notificate } = useNotification()

  const request = useCallback(
    async (
      url: string,
      method: Method = 'get',
      body: BodyType = null,
      token = null
    ) => {
      setLoading(true)
      try {
        let stringifiedBody = null
        if (body) {
          stringifiedBody = JSON.stringify(body)
        }
        const { data } = await axios({
          url: `${baseApiUrl}/${url}`,
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Token ${token}` : '',
          },
          data: stringifiedBody,
        })
        setLoading(false)
        return data
      } catch (error) {
        setLoading(false)
        setRequestError(error.message)
      }
    },
    []
  )

  const clearError = useCallback(() => setRequestError(null), [])

  useEffect(() => {
    if (requestError) {
      notificate('Something went wrong', requestError, 'error')
      clearError()
    }
  }, [requestError, clearError, notificate])

  return { request, loading, requestError, clearError } as const
}
