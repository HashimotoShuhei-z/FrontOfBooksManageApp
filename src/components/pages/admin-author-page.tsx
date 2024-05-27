'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/parts/button'
import { getToken } from '@/lib/getCookieCSR'
import AuthorSearch from '../partsGroups/serchForm/serchAuthor'
import AuthorTable from '@/components/partsGroups/tables/author-table'
import { UpdateAuthor } from '../partsGroups/update/updateAuthor'
import { DeleteAuthor } from '../partsGroups/delete/deleteAuthor'

async function fetchAuthors(name: string, page: number) {
  //引数なしでクエリのないオブジェクトを作成
  const params = new URLSearchParams()
  //キーと値のペアをオブジェクトに追加
  params.append('name', name)
  params.append('page', page.toString())
  // クッキーからトークンを取得
  const token = getToken()

  // params.toString() で ?title=タイトル&page=ページ番号 という文字列を作成
  const response = await fetch(`http://localhost/api/admin/authors?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token.split('=')[1]}` : '' // クッキー文字列のトークンの値部分のみ抽出
    },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Failed to fetch authors')
  }

  const authorsData: AuthorsData = await response.json()
  return authorsData
}

const AdminAuthorPage = ({
  searchParams //page.tsxのpage関数にはserchParamsかparamsというpropsを入れることが可能
}: {
  searchParams?: {
    //TypeScriptにおけるOptionalChaining(なくてもいいよ、だけどない場合にも対応したいよ的な)
    name?: string //↑プロパティが存在すればそのプロパティを返す、なければエラーundifinedを返す
    page?: string
  }
}) => {
  const name = searchParams?.name || ''
  const page = Number(searchParams?.page) || 1

  const [authors, setAuthors] = useState<Author[]>([])
  const [meta, setMeta] = useState<Meta>()
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)

    fetchAuthors(name, page)
      .then((data) => {
        setAuthors(
          data.authors.map((author) => {
            return {
              ...author,
              components: (author: Author) => [
                <UpdateAuthor id={author.id} name={author.name} />,
                <DeleteAuthor id={author.id} />
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
  }, [name, page])

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main className="w-screen h-screen">
      <AuthorSearch placeholder="Serch authors..." />
      <div className="w-screen px-40 pt-5">
        <h2 className="mx-3 my-1 text-xl font-semibold">著者一覧</h2>
        <AuthorTable authors={authors} meta={meta} />
      </div>
      <Link href="./home" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-8' })}>
        ホームに戻る
      </Link>
    </main>
  )
}

export default AdminAuthorPage
