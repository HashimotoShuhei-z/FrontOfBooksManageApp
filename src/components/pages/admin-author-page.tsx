'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/parts/button'
import { getToken } from '@/lib/getCookieCSR'
import AuthorSearch from '../partsGroups/serchForm/serchAuthor'
import AuthorTable from '@/components/partsGroups/tables/author-table'

//TODO：クエリーparamが変わった時にAPIのエンドポイントが変わってくれない
const AdminAuthorPage = ({
  searchParams //page.tsxのpage関数にはserchParamsかparamsというpropsを入れることが可能
}: {
  searchParams?: {
    //TypeScriptにおけるOptionalChaining(なくてもいいよ、だけどない場合にも対応したいよ的な)
    name?: string //↑プロパティが存在すればそのプロパティを返す、なければエラーundifinedを返す
    page?: string
  }
}) => {
  const [authors, setAuthors] = useState<AuthorsData | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken()
        if (!token) {
          throw new Error('Token not found')
        }
        const name = searchParams?.name || ''
        const page = Number(searchParams?.page) || 1
        const params = new URLSearchParams()
        params.append('name', name)
        params.append('page', page.toString())

        const res = await fetch(`http://localhost/api/admin/authors?${params.toString()}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          cache: 'no-store'
        })

        if (!res.ok) {
          throw new Error('Failed to fetch authors data')
        }

        const data: AuthorsData = await res.json()
        setAuthors(data)
      } catch (error) {
        console.error('Error fetching authors data:', error)
        //TODO:初回レンダリング時になぜかトークンを取得できないのでページをリロード→取得できる
        setTimeout(() => {
          window.location.reload()
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [searchParams])

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (!authors) {
    return <h1>No authors data found</h1>
  }

  //   fetchAuthors(name, page)
  //     .then((data) => {
  //       setAuthors(
  //         data.author.map((author) => {
  //           return {
  //             ...author,
  //             components: (author: Author) => [
  //               <UpdateAuthor id={author.id} name={author.name} />,
  //               <DeleteAuthor id={author.id} />
  //               //既存のコンポーネントをPropsとともにtableコンポーネントへ送る
  //             ]
  //           }
  //         })
  //       )
  //       setMeta(data.meta)
  //     })
  //     .catch((err) => {
  //       setError(err.message)
  //     })
  // }, [name, page])

  // if (error) {
  //   return <p>Error: {error}</p>
  // }

  return (
    <main className="w-screen h-screen">
      <AuthorSearch placeholder="Serch authors..." />
      <div className="w-screen px-40 pt-5">
        <h2 className="mx-3 my-1 text-xl font-semibold">著者一覧</h2>
        <AuthorTable author={authors.author} meta={authors.meta} />
      </div>
      <Link href="./home" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-8' })}>
        ホームに戻る
      </Link>
    </main>
  )
}

export default AdminAuthorPage
