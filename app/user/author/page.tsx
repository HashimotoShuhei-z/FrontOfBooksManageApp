import AuthorTable from '@/components/original/AuthorTable'
import { TablePagination } from '@/components/original/TablePagination'
import Search from '@/components/original/BookSerch'
import React from 'react'

const page = () => {
  return (
    <main className='w-screen h-screen'>
        <Search placeholder="Serch authors..." />
        <div className='w-screen px-40 py-5'>
          <h2 className='mx-3 my-1 text-xl font-semibold'>著者一覧</h2>
          <AuthorTable /> 
          <TablePagination/> 
        </div>
    </main>
  )
}

export default page
