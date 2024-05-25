import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/partsGroups/table'
import TablePagination from '../tablePagination'
import Link from 'next/link'
import { buttonVariants } from '../../parts/button'

export default async function AuthorTable({ authors, meta }: AuthorsData) {

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>著者名</TableHead>
            <TableHead>登録日時</TableHead>
            <TableHead>登録者</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authors.map((author) => (
            <TableRow>
              <TableCell className="font-medium">
                <Link
                  href={`./author/${author.id}`}
                  className={buttonVariants({
                    variant: 'link',
                    size: 'smallLink'
                  })}
                >
                  {author.name}
                </Link>
              </TableCell>
              <TableCell>{author.created_at}</TableCell>
              {author.created_user == null ? (
                <TableCell>null</TableCell>
              ) : (
                <TableCell>{author.created_user.name}</TableCell>
              )}
              <TableCell>
                {/* 任意の既存のコンポーネントをpagesコンポーネントから受け取って表示 */}
                {author.components(author).map((Component) => (
                  <div key={author.id}>{Component}</div>
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
