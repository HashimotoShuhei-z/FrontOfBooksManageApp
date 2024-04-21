import AuthorTable from '@/components/original/AuthorTable'
import React from 'react'
import AuthorSearch from '@/components/original/AuthorSerch'

const page = ({
  searchParams, //page.tsxのpage関数にはserchParamsかparamsというpropsを入れることが可能。現在のURLの?以降をオブジェクトに
}: {
  searchParams?: {  //TypeScriptにおけるOptionalChaining(なくてもいいよ、だけどない場合にも対応したいよ的な)
    name?: string; //↑プロパティが存在すればそのプロパティを返す、なければエラーundifinedを返す
    page?: string;
  };
}) => {
  const name = searchParams?.name || '';
  const page = Number(searchParams?.page) || 1;

  return (
    <main className='w-screen h-screen'>
        <AuthorSearch placeholder="Serch authors..." />
        <div className='w-screen px-40 py-5'>
          <h2 className='mx-3 my-1 text-xl font-semibold'>著者一覧</h2>
          <AuthorTable name={name} page={page} />  
        </div>
    </main>
  )
}

export default page
