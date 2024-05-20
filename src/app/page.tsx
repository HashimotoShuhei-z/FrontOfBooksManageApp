import { buttonVariants } from '@/components/parts/button'
import Link from 'next/link'
export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="w-screen flex space-between justify-center items-center flex-wrap pt-32 pb-16">
        <Link
          href="/admin/login"
          className={buttonVariants({ variant: 'admin', size: 'big', className: 'bg-yellow-800 hover:bg-yellow-900' })}
        >
          管理者ログイン
        </Link>
        <Link
          href="/user/login"
          className={buttonVariants({ variant: 'user', size: 'big', className: 'bg-blue-600 hover:bg-blue-800' })}
        >
          社員ログイン
        </Link>
      </div>
      <div className="w-screen flex justify-center items-center flex-wrap pb-16">
        <Link
          href="/admin/register"
          className={buttonVariants({ variant: 'user', size: 'thin', className: 'bg-yellow-600 hover:bg-yellow-700' })}
        >
          管理者登録
        </Link>
        <Link
          href="/user/register"
          className={buttonVariants({ variant: 'user', size: 'thin', className: 'bg-blue-400 hover:bg-blue-700' })}
        >
          社員登録
        </Link>
      </div>
    </main>
  )
}
//ボタン・・・基本軸はvariant,size {}内のclsssNameでカスタマイズ自由
