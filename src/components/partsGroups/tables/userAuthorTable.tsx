import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/partsGroups/table'
import TablePagination from '../partsGroups/tablePagination'
import Link from 'next/link'
import { buttonVariants } from '../parts/button'
import { getToken } from '@/lib/getCookieSSR'

async function getAuthorsData(name: string, page: number) {
  //引数なしでクエリのないオブジェクトを作成
  const params = new URLSearchParams()

  //キーと値のペアをオブジェクトに追加
  params.append('name', name)
  params.append('page', page.toString())
  // クッキーからトークンを取得
  const token = getToken()

  // params.toString() で ?title=タイトル&page=ページ番号 という文字列を作成
  const response = await fetch(`http://localhost/api/user/authors?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token.split('=')[1]}` : '' // クッキー文字列のトークンの値部分のみ抽出
    },
    cache: 'no-store'
  })

  const authorsData: AuthorsData = await response.json()
  return authorsData
}

export default async function UserAuthorTable({ name, page }: { name: string; page: number }) {
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
                <Link href={`./author/${author.id}`} className={buttonVariants({ variant: 'link', size: 'smallLink' })}>
                  {author.name}
                </Link>
              </TableCell>
              <TableCell>{author.created_at}</TableCell>
              {author.created_user == null ? (
                <TableCell>null</TableCell>
              ) : (
                <TableCell>{author.created_user.name}</TableCell>
              )}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination totalPages={authorsData.meta.lastPage} />
    </div>
  )
}
