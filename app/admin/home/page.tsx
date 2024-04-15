"use client";
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();

  return (
    <main className="h-screen w-screen">
        <div className="w-screen flex justify-center items-center flex-wrap pt-32 pb-12">
            <button type="button" onClick={() => router.push('./book')} className="w-72 h-72 mx-16 font-semibold text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">図書一覧</button>
            <button type="button" onClick={() => router.push('./author')} className="w-72 h-72 mx-16 font-semibold text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">著者一覧</button>
        </div>
        <div className="ml-8">
        <Link href="/" className={buttonVariants({ variant: "outline", size: "top", className:"my-8"  })}>トップページに戻る</Link>
        </div>
    </main>
  );
}
