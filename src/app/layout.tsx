import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})
export const metadata: Metadata = {
  title: 'BooksManageApp',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <header className="flex justify-center items-center h-40 border-b gap-4 lg:gap-6 bg-purple-500">
          <h1 className="flex items-center text-4xl font-semibold">図書管理アプリ</h1>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
