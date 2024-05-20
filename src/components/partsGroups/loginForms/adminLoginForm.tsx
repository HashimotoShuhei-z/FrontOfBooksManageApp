'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../parts/button'
import Link from 'next/link'
import { Input } from '../parts/input'
import { useToast } from '../ui/use-toast'
interface LoginResponse {
  token: string
}

const AdminLoginForm = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const response = await fetch('http://localhost/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        console.error({ response })
        console.error({ json: await response.json() })
        throw new Error('Invalid username or password')
      }

      const data: LoginResponse = await response.json()
      const token: string = data.token
      // トークンをクッキーに保存する
      const expirationDate: Date = new Date()
      expirationDate.setDate(expirationDate.getDate() + 1) // トークンの有効期限を1日に設定
      const cookieOptions: string = `path=/admin; expires=${expirationDate.toUTCString()}`
      document.cookie = `token=${token}; ${cookieOptions}`

      //ログイン成功後のリダイレクト
      toast({ description: 'ログインに成功しました！', type: 'foreground' })
      console.log('Admin Login successfully')
      router.push('./home')
    } catch (error) {
      toast({ variant: 'destructive', description: 'emailかpasswordが間違っています', type: 'foreground' })
      if (error instanceof Error) {
        setError(error.message)
        console.error('Error:', error)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <div className="w-96 p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800 mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">管理者ログイン</h2>
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
          <Link href="/admin/register" className="text-blue-600 hover:underline dark:text-blue-500">
            新規登録
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AdminLoginForm
