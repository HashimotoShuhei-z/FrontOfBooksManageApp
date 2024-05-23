import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/partsGroups/table'
import Link from 'next/link'
import TablePagination from '../tablePagination'
import { buttonVariants } from '@/components/parts/button'
export default async function BookTable({ books, meta }: BooksData) {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>
                <Link
                  href={`./author/${book.author_id}`}
                  className={buttonVariants({
                    variant: 'link',
                    size: 'smallLink'
                  })}
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
              <TableCell>
                {/* 任意の既存のコンポーネントをpagesコンポーネントから受け取って表示 */}
                {book.components(book).map((Component) => (
                  <div key={book.id}>{Component}</div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta && <TablePagination totalPages={meta.lastPage} />}
    </div>
  )
}
