'use client'
//すべてのクッキーをオブジェクトとして取得
export const getAllCookies = (): Record<string, string> => {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=')
    return { ...acc, [name]: value }
  }, {})
  return cookies
}

export const getToken = () => {
  return getAllCookies().token
}
