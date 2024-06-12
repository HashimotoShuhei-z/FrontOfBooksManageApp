'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, buttonVariants } from '../parts/button'
import Link from 'next/link'
import { Input } from '../parts/input'
import { useToast } from './use-toast'

interface LoginResponse {
  token: string
  code: number
  message: string
}

//TODO:Props名としてpersonはあまり良くなさそう...
interface Person {
  english: string
  japanese: string
}

const LoginForm = (person: Person) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fetchError, setFetchError] = useState<string>('')
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const response = await fetch(`http://localhost/api/${person.english}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data: LoginResponse = await response.json()

      if (!response.ok) {
        console.error({ response })
        throw new Error(data.message)
      }

      const token = data.token
      // トークンをクッキーに保存する
      const expirationDate: Date = new Date()
      expirationDate.setDate(expirationDate.getDate() + 1) // トークンの有効期限を1日に設定
      const cookieOptions: string = `path=/${person.english}; expires=${expirationDate.toUTCString()}`
      document.cookie = `token=${token}; ${cookieOptions}`

      //ログイン成功後のリダイレクト
      toast({ description: `${person.japanese}として、ログインに成功しました！`, type: 'foreground' })
      console.log(`${person.english} login successfully`)
      router.push('./home')
    } catch (error) {
      if (error instanceof Error) {
        setFetchError(error.message)
        console.error('Error:', error)
      } else {
        setFetchError('An unknown error occurred')
      }
      toast({ variant: 'destructive', description: fetchError, type: 'foreground' })
    }
  }
  //エラーハンドリングについて：UIに関する箇所はuseState,エラーハンドリングに関することはErrorクラスを用いる

  return (
    <div className="w-96 p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800 mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">{person.japanese}ログイン</h2>
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center">{<Button type="submit">Login</Button>}</div>
        <div className="text-sm font-medium text-gray-900 dark:text-white px-20 ">
          未登録の方は
          <Link href="./register" className="text-blue-600 hover:underline dark:text-blue-500">
            新規登録
          </Link>
        </div>
      </form>
      <Link href="/" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-8' })}>
        トップページに戻る
      </Link>
    </div>
  )
}

export default LoginForm
