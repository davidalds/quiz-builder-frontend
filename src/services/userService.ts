import type { userType } from '@/auth/types'
import { api } from '.'

export async function getUser() {
  const { data } = await api.get<userType>('users/user')
  return data
}

export async function getGuestId() {
  await api.get('users/guest')
}
