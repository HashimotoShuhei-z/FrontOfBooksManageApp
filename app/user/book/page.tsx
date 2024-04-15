import BookTable from '@/components/original/BookTable'
import { TablePagination } from '@/components/original/TablePagenation'
import Search from '@/components/original/serch'
import React from 'react'

const page = () => {
  return (
    <main className='w-screen h-screen'>
        <Search placeholder="Serch books..." />
        <div className='w-screen px-40 py-5'>
          <h2 className='mx-3 my-1 text-xl font-semibold'>図書一覧</h2>
          <BookTable />  
          <TablePagination />
        </div>
    </main>
  )
}

export default page