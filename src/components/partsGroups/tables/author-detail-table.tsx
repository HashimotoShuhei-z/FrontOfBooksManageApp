import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/partsGroups/table'
import TablePagination from '../tablePagination'
import Link from 'next/link'
import { buttonVariants } from '../../parts/button'

export default async function AuthorDetailTable({ author, books, meta }: AuthorData) {
  return (
    <div>
      <h1 className="mt-8 mb-2 text-3xl font-bold flex justify-center">{author.name}の関連図書</h1>
      <div className="w-screen px-40 py-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead>登録日時</TableHead>
              <TableHead>登録者</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.created_at}</TableCell>
                {book.created_user == null ? (
                  <TableCell>null</TableCell>
                ) : (
                  <TableCell>{book.created_user.name}</TableCell>
                )}
                {author.components && (
                  <TableCell>
                    {/* 任意の既存のコンポーネントをpagesコンポーネントから受け取って表示 */}
                    {author.components(author).map((Component) => (
                      <div key={author.id}>{Component}</div>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination totalPages={meta.lastPage} />
      </div>
      <div>
        <Link href="../author" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-8 ' })}>
          著者一覧に戻る
        </Link>
      </div>
      <div>
        <Link href="../book" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-2 ' })}>
          図書一覧に戻る
        </Link>
      </div>
    </div>
  )
}
