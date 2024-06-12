'use client'
import { DeleteBook } from '@/components/partsGroups/delete/deleteBook'
import { UpdateBook } from '@/components/partsGroups/update/updateBook'
import { getToken } from '@/lib/getCookieCSR'
import { useState, useEffect } from 'react'

const useFetchBooks = (title: string, page: number) => {
  const [books, setBooks] = useState<Book[]>([])
  const [meta, setMeta] = useState<Meta>()
  const [error, setError] = useState<string | null>(null)

  const params = new URLSearchParams()
  params.append('title', title)
  params.append('page', page.toString())

  //TODO:初回ロード時にトークンが取れないし、URLかわった時もテーブルがかわってくれない
  useEffect(() => {
    const token = getToken()
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost/api/admin/books?${params.toString()}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          cache: 'no-store'
        })

        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }

        const booksData: BooksData = await response.json()
        setBooks(
          booksData.book.map((book: Book) => ({
            ...book,
            components: (book) => [
              <UpdateBook key={`update-${book.id}`} id={book.id} title={book.title} author_id={book.author_id} />,
              <DeleteBook key={`delete-${book.id}`} id={book.id} />
              //既存のコンポーネントをPropsとともにtableコンポーネントへ送る
            ]
          }))
        )
        setMeta(booksData.meta)
      } catch (err) {
        //console.log(err.message);
      }
    }

    fetchBooks()
  }, [title, page])

  return { books, meta, error }
}

export default useFetchBooks
