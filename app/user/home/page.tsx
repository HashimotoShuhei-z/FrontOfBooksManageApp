import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
export default function Home() {

  return (
    <main className="h-screen w-screen">
        <div className="w-screen flex justify-center items-center flex-wrap pt-32 pb-12">
          <Link href="/user/book" className={buttonVariants({ variant: "admin", size: "mega", className:"bg-green-600 hover:bg-green-800" })}>図書一覧</Link>
          <Link href="/user/author" className={buttonVariants({ variant: "admin", size: "mega", className:"bg-red-700 hover:bg-red-900" })}>著者一覧</Link>
        </div>
        <div className="ml-8">
          <Link href="/" className={buttonVariants({ variant: "outline", size: "top", className:"my-8"  })}>トップページに戻る</Link>
        </div>
    </main>
  );
}
