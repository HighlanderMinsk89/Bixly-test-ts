import { AlertStatus } from '@chakra-ui/alert'
import { useToast } from '@chakra-ui/toast'

export const useNotification = () => {
  const toast = useToast()

  const notificate = (
    title: string,
    description: string,
    status: AlertStatus
  ): void => {
    toast({
      title,
      description,
      status,
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    })
  }

  return { notificate } as const
}
