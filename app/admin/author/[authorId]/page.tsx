import TablePagination from "@/components/original/tablePagination";
import { buttonVariants } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from "next/link";
  
  async function getAuthorsData(id: number) {
    const response = await fetch(`http://localhost/api/authors/${id}`, {
        cache: "no-store",
    });

    const authorsData: AuthorData = await response.json();
    return authorsData;
  }
  
  export default async function Page({params}: {params: {authorId: number}}) {
    const authorData = await getAuthorsData(params.authorId);

    return (
        <main className='w-screen h-screen'>
            <h1 className="mt-8 mb-2 text-3xl font-bold flex justify-center">{authorData.author.name}の関連図書</h1>
            <div className='w-screen px-40 py-5'>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>タイトル</TableHead>
                    <TableHead>登録日時</TableHead>
                    <TableHead>登録者</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {authorData.book.map((book) => (
                    <TableRow >
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.created_at}</TableCell>
                        {book.created_user == null  ?
                          <TableCell>null</TableCell>
                          :
                          <TableCell>{book.created_user.name}</TableCell>
                        }
                        <TableCell>更新</TableCell>
                        <TableCell>削除</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                <TablePagination totalPages={authorData.meta.lastPage} />
        </div>
        <div>
          <Link href="../author" className={buttonVariants({ variant: "outline", size: "top", className:"my-8 " })}>著者一覧に戻る</Link>
        </div>
        <div>
          <Link href="../book" className={buttonVariants({ variant: "outline", size: "top", className:"my-2 " })}>図書一覧に戻る</Link>
        </div>
        </main>
    )
  }
