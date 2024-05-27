'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/parts/button'
import { getToken } from '@/lib/getCookieCSR'
import AuthorSearch from '../partsGroups/serchForm/serchAuthor'
import AuthorDetailTable from '../partsGroups/tables/author-detail-table'

async function fetchAuthor(id: number) {
  // クッキーからトークンを取得
  const token = getToken()

  const response = await fetch(`http://localhost/api/user/authors/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token.split('=')[1]}` : '' // クッキー文字列のトークンの値部分のみ抽出
    },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Failed to fetch authors')
  }

  const authorsData: AuthorData = await response.json()
  return authorsData
}

//[authorId]/page.tsx から受け取ったauthorIdをもとに著者詳細情報を取得
const UserAuthorDetailPage = ({ params }: { params: number }) => {
  const [author, setAuthor] = useState<Author>()
  const [books, setBooks] = useState<Book[]>([])
  const [meta, setMeta] = useState<Meta>()
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)

    fetchAuthor(params)
      .then((data) => {
        setAuthor({
          ...data.author
          //TODO:user-bookと同じで借り入れ機能をここにも表示
        })
        setBooks(data.books)
        setMeta(data.meta)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [params])

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main className="w-screen h-screen">
      <AuthorSearch placeholder="Serch authors..." />
      <div className="w-screen px-40 pt-5">
        <h2 className="mx-3 my-1 text-xl font-semibold">著者一覧</h2>
        {author && meta && <AuthorDetailTable author={author} books={books} meta={meta} />}
      </div>
      <Link href="./home" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-8' })}>
        ホームに戻る
      </Link>
    </main>
  )
}

export default UserAuthorDetailPage
