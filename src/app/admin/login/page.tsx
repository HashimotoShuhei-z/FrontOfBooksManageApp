import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import AdminLoginForm from '@/components/original/adminLoginForm'

//TODO:ログイン処理を実装する
const page = () => {
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
