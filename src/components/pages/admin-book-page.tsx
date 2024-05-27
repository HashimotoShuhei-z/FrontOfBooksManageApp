'use client'
//このページはCSRで良い？？
import React, { useEffect, useState } from 'react'
import BookSearch from '@/components/partsGroups/serchForm/serchBook'
import Link from 'next/link'
import { buttonVariants } from '@/components/parts/button'
import { getToken } from '@/lib/getCookieCSR'
import BookTable from '@/components/partsGroups/tables/book-table'
import { UpdateBook } from '../partsGroups/update/updateBook'
import { DeleteBook } from '../partsGroups/delete/deleteBook'

async function fetchBooks(title: string, page: number) {
  //引数なしでクエリのないオブジェクトを作成
  const params = new URLSearchParams()
  //キーと値のペアをオブジェクトに追加
  params.append('title', title)
  params.append('page', page.toString())
  // クッキーからトークンを取得
  const token = getToken()

  // params.toString() で ?title=タイトル&page=ページ番号 という文字列を作成
  const response = await fetch(`http://localhost/api/admin/books?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token.split('=')[1]}` : '' // クッキー文字列のトークンの値部分のみ抽出
    },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Failed to fetch books')
  }

  const booksData: BooksData = await response.json()
  return booksData
}

const AdminBookPage = ({
  searchParams //page.tsxのpage関数にはserchParamsかparamsというpropsを入れることが可能
}: {
  searchParams?: {
    //TypeScriptにおけるOptionalChaining(なくてもいいよ、だけどない場合にも対応したいよ的な)
    title?: string //↑プロパティが存在すればそのプロパティを返す、なければエラーundifinedを返す
    page?: string
  }
}) => {
  const title = searchParams?.title || ''
  const page = Number(searchParams?.page) || 1

  const [books, setBooks] = useState<Book[]>([])
  const [meta, setMeta] = useState<Meta>()
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)

    fetchBooks(title, page)
      .then((data) => {
        setBooks(
          data.books.map((book) => {
            return {
              ...book,
              components: (book: Book) => [
                <UpdateBook id={book.id} title={book.title} author_id={book.author_id} />,
                <DeleteBook id={book.id} />
                //既存のコンポーネントをPropsとともにtableコンポーネントへ送る
              ]
            }
          })
        )
        setMeta(data.meta)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [title, page])

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main className="w-screen h-screen">
      <BookSearch placeholder="Serch books..." />
      <div className="w-screen px-40 py-5">
        <h2 className="mx-3 my-1 text-xl font-semibold">図書一覧</h2>
        <BookTable books={books} meta={meta} />
      </div>
      <Link href="./home" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-8' })}>
        ホームに戻る
      </Link>
    </main>
  )
}

export default AdminBookPage
