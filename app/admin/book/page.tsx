import BookTable from '@/components/original/BookTable'
import { TablePagination } from '@/components/original/TablePagenation'
import React from 'react'
import BookSearch from '@/components/original/BookSerch'

const page = ({
  searchParams, //page.tsxのpage関数にはserchParamsかparamsというpropsを入れることが可能
}: {
  searchParams?: {  //TypeScriptにおけるOptionalChaining(なくてもいいよ、だけどない場合にも対応したいよ的な)
    title?: string; //↑プロパティが存在すればそのプロパティを返す、なければエラーundifinedを返す
    page?: string;
  };
}) => {
  const title = searchParams?.title || '';
  const page = Number(searchParams?.page) || 1;
  
  return (
    <main className='w-screen h-screen'>
        <BookSearch placeholder="Serch books..." />
        <div className='w-screen px-40 py-5'>
          <h2 className='mx-3 my-1 text-xl font-semibold'>図書一覧</h2>
          <BookTable title={title} page={page}/>  
          <TablePagination />
        </div>
    </main>
  )
}

export default page