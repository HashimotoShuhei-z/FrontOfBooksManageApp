'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import AdminLoginForm from '@/components/original/adminLoginForm'
//もしcookieに認証トークンを保持していた場合、ホームにリダイレクトさせたい
//すべてのクッキーをオブジェクトとして取得
export const getAllCookies = (): Record<string, string> => {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=')
    return { ...acc, [name]: value }
  }, {})
  return cookies
}

const page = () => {
  const router = useRouter()
  //useEffectはコンポーネントが画面に表示された瞬間に処理をしてくれる
  useEffect(() => {
    const cookies = getAllCookies()
    //トークン取得
    const token = cookies.token
    // トークンが存在する場合、ホーム画面に自動的に遷移させる
    if (token) {
      console.log(1)
      router.push('./home')
    }
  })

  return (
    <main className="w-screen h-screen">
      <div className="w-screen h-screen mx-auto lg:py-16 lg:grid-cols-2 gap-8 lg:gap-16">
        <AdminLoginForm />
        <Link href="/" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-8' })}>
          トップページに戻る
        </Link>
      </div>
    </main>
  )
}

export default page
