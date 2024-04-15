import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from "@/components/ui/button"


const page = () => {
  return (
    <main className='w-screen h-screen'>
        <div className="w-screen h-screen mx-auto lg:py-16 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="w-96 p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800 mx-auto mt-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                    管理者ログイン
                </h2>
                <form className="mt-8 space-y-6" action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className='flex justify-center'>
                        <Button asChild>
                            <Link href="/admin/home">Login</Link>
                        </Button>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white px-20 ">
                        未登録の方は<Link href='/admin/register' className="text-blue-600 hover:underline dark:text-blue-500">新規登録</Link>
                    </div>
                </form>
            </div>
            <Link href="/" className={buttonVariants({ variant: "outline", size: "top", className:"my-8" })}>トップページに戻る</Link>
        </div>
    </main>
  )
}

export default page