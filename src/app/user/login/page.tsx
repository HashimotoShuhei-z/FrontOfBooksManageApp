'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import UserLoginForm from '@/components/original/userLoginForm'
//もしcookieに認証トークンを保持していた場合、ホームにリダイレクトさせたい
//すべてのクッキーをオブジェクトとして取得する関数
export const getAllCookies = (): Record<string, string> => {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=')
    return { ...acc, [name]: value }
  }, {})
  return cookies
}

const page = () => {
  const router = useRouter()

  // cookieの内容を見てハンドリングを行う
  const checkTokenAndRedirect = () => {
    const cookies = getAllCookies()
    //トークン取得
    const token = cookies.token
    console.log({ cookies, token })
    // トークンが存在する場合、ホーム画面に自動的に遷移させる
    if (token) {
      router.push('./home')
    }
  }

  //useEffectはコンポーネントが画面に表示された瞬間に処理をしてくれる
  useEffect(() => {
    // ドキュメントの準備が完了した後に処理を実行
    if (document.readyState === 'complete') {
      checkTokenAndRedirect()
    }
  }, [document.readyState])

  return (
    <main className="w-screen h-screen">
      <div className="w-screen h-screen mx-auto lg:py-16 lg:grid-cols-2 gap-8 lg:gap-16">
        <UserLoginForm />
        <Link href="/" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-8' })}>
          トップページに戻る
        </Link>
      </div>
    </main>
  )
}

export default page
