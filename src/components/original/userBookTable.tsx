import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import TablePagination from './tablePagination'
import { metadata } from '@/app/layout'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { getToken } from '@/lib/auth'

async function getBooksData(title: string, page: number) {
  //引数なしでクエリのないオブジェクトを作成
  const params = new URLSearchParams()

  //キーと値のペアをオブジェクトに追加
  params.append('title', title)
  params.append('page', page.toString())
  // クッキーからトークンを取得
  const token = getToken()

  // params.toString() で ?title=タイトル&page=ページ番号 という文字列を作成
  const response = await fetch(`http://localhost/api/user/books?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token.split('=')[1]}` : '' // クッキー文字列のトークンの値部分のみ抽出
    },
    cache: 'no-store'
  })

  const booksData: BooksData = await response.json()
  return booksData
}

export default async function UserBookTable({ title, page }: { title: string; page: number }) {
  const booksData = await getBooksData(title, page)

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>タイトル</TableHead>
            <TableHead>著者名</TableHead>
            <TableHead>登録日時</TableHead>
            <TableHead>登録者</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {booksData.book.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>
                <Link
                  href={`./author/${book.author_id}`}
                  className={buttonVariants({ variant: 'link', size: 'smallLink' })}
                >
                  {book.author.name}
                </Link>
              </TableCell>
              <TableCell>{book.created_at}</TableCell>
              {book.created_user == null ? (
                <TableCell>null</TableCell>
              ) : (
                <TableCell>{book.created_user.name}</TableCell>
              )}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination totalPages={booksData.meta.lastPage} />
    </div>
  )
}
