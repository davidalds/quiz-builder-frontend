import { getGuestId, getUser } from '@/services/userService'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    retry: 1,
  })
}

export const useGuestId = () => {
  return useQuery({
    queryKey: ['guestId'],
    queryFn: () => getGuestId(),
    refetchOnWindowFocus: false,
  })
}
