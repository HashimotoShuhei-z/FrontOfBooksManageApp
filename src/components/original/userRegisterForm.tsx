'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

const UserRegisterForm = () => {
  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const response = await fetch('http://localhost/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: userName, email: email, password: password })
      })

      if (!response.ok) {
        console.error({ response })
        console.error({ json: await response.json() })
        throw new Error('Invalid username or password')
      }
      //登録成功後のリダイレクト
      toast({ description: '登録に成功しました！', type: 'foreground' })
      console.log('User Register successfully')
      router.push('./login')
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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">社員登録</h2>
      <form className="mt-8 space-y-6" onSubmit={handleRegister}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="name"
            name="userName"
            id="userName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
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
        <div className="flex justify-center">{<Button type="submit">登録</Button>}</div>
      </form>
    </div>
  )
}

export default UserRegisterForm
