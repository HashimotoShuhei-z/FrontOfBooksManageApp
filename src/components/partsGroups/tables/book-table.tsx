import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/partsGroups/table'
import Link from 'next/link'
import TablePagination from '../tablePagination'
import { buttonVariants } from '@/components/parts/button'
export default function BookTable({ book, meta }: BooksData) {
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
          {book.map((bookItem: Book) => (
            <TableRow key={bookItem.id}>
              <TableCell className="font-medium">{bookItem.title}</TableCell>
              <TableCell>
                <Link
                  href={`./author/${bookItem.author_id}`}
                  className={buttonVariants({
                    variant: 'link',
                    size: 'smallLink'
                  })}
                >
                  {bookItem.author.name}
                </Link>
              </TableCell>
              <TableCell>{bookItem.created_at}</TableCell>
              {bookItem.created_user == null ? (
                <TableCell>null</TableCell>
              ) : (
                <TableCell>{bookItem.created_user.name}</TableCell>
              )}
              {bookItem.components && (
                <TableCell>
                  {/* 任意の既存のコンポーネントをpagesコンポーネントから受け取って表示 */}
                  {bookItem.components(bookItem).map((Component, index) => (
                    <div key={index}>{Component}</div>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta && <TablePagination totalPages={meta.lastPage} />}
    </div>
  )
}
