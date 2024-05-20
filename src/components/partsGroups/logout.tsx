'use client'
import { useRouter } from 'next/navigation'
import { Button } from '../parts/button'
import { useEffect, useState } from 'react'
import { getToken } from '@/lib/getCookieCSR'

// クッキーを削除する関数
const deleteCookie = (name: string, validRange: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${validRange};`
}

const Logout = (props: { person: string }) => {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  //クライアントサイドでのみ実行されるようにuseEffectフック内にラップ
  useEffect(() => {
    const token = getToken()
    setToken(token)
  }, [])

  //1回はリロードをしないとクッキーを取得してくれないためログアウトできない
  async function handleLogout() {
    try {
      const response = await fetch(`http://localhost/api/${props.person}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}` // トークンをAuthorizationヘッダーに設定
        }
      })

      if (!response.ok) {
        console.log(token)
        throw new Error('Failed to logout')
      }
      //ログアウト成功時にcookie内のトークンを削除し、トップページへリダイレクトさせる
      deleteCookie('token', `/${props.person}`)
      console.log('Success to logout')
      router.push('/')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="ml-8">
      <Button variant="outline" onClick={() => handleLogout()}>
        ログアウト
      </Button>
    </div>
  )
}

export default Logout
