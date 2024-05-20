import React from 'react'
import AuthorSearch from '@/components/partsGroups/serchForm/authorSerch'
import Link from 'next/link'
import { buttonVariants } from '@/components/parts/button'
import UserAuthorTable from '@/components/pages/userAuthorTable'

const page = ({
  searchParams //page.tsxのpage関数にはserchParamsかparamsというpropsを入れることが可能。現在のURLの?以降をオブジェクトに
}: {
  searchParams?: {
    //TypeScriptにおけるOptionalChaining(なくてもいいよ、だけどない場合にも対応したいよ的な)
    name?: string //↑プロパティが存在すればそのプロパティを返す、なければエラーundifinedを返す
    page?: string
  }
}) => {
  const name = searchParams?.name || ''
  const page = Number(searchParams?.page) || 1

  return (
    <main className="w-screen h-screen">
      <AuthorSearch placeholder="Serch authors..." />
      <div className="w-screen px-40 pt-5">
        <h2 className="mx-3 my-1 text-xl font-semibold">著者一覧</h2>
        <UserAuthorTable name={name} page={page} />
      </div>
      <Link href="./home" className={buttonVariants({ variant: 'outline', size: 'top', className: 'my-8' })}>
        ホームに戻る
      </Link>
    </main>
  )
}

export default page
