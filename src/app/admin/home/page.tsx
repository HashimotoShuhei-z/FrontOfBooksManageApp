import Logout from '@/components/original/logout'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="w-screen flex justify-center items-center flex-wrap pt-32 pb-12">
        <Link
          href="/admin/book"
          className={buttonVariants({ variant: 'admin', size: 'mega', className: 'bg-green-600 hover:bg-green-800' })}
        >
          図書一覧
        </Link>
        <Link
          href="/admin/author"
          className={buttonVariants({ variant: 'admin', size: 'mega', className: 'bg-red-700 hover:bg-red-900' })}
        >
          著者一覧
        </Link>
      </div>
      <Logout person="admin" />
    </main>
  )
}
