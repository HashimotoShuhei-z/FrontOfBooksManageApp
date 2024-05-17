import { cookies } from 'next/headers'

export const getAllCookies = (): string => {
  const cookieStore = cookies()
  const cookie = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(';')
  return cookie
}

export const getToken = (): string | undefined => {
  // クッキーからトークンを取得
  const token = getAllCookies()
    .split('; ')
    .find((cookie) => cookie.startsWith('token='))
  return token
}
