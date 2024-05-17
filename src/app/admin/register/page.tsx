import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import AdminRegisterForm from '@/components/original/adminRegisterForm'

const page = () => {
  return (
    <main className="w-screen h-screen">
      <div className="w-screen h-screen mx-auto lg:py-16 lg:grid-cols-2 gap-8 lg:gap-16">
        <AdminRegisterForm />
        <Link href="/" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-8' })}>
          トップページに戻る
        </Link>
      </div>
    </main>
  )
}

export default page
