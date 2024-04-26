import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import TablePagination from './tablePagination'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { UpdateAuthor } from './updateAuthor'
import { DeleteAuthor } from './deleteAuthor'

async function getAuthorsData(name: string, page: number) {
  //引数なしでクエリのないオブジェクトを作成
  const params = new URLSearchParams()

  //キーと値のペアをオブジェクトに追加
  params.append('name', name)
  params.append('page', page.toString())

  // params.toString() で ?title=タイトル&page=ページ番号 という文字列を作成
  const response = await fetch(`http://localhost/api/authors?${params.toString()}`, {
    cache: 'no-store'
  })

  const authorsData: AuthorsData = await response.json()
  return authorsData
}

export default async function AdminAuthorTable({ name, page }: { name: string; page: number }) {
  const authorsData = await getAuthorsData(name, page)

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
          {authorsData.author.map((author) => (
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
                {' '}
                <UpdateAuthor id={author.id} name={author.name} />{' '}
              </TableCell>
              <TableCell>
                {' '}
                <DeleteAuthor id={author.id} />{' '}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination totalPages={authorsData.meta.lastPage} />
    </div>
  )
}
