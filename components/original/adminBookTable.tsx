import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import TablePagination from "./tablePagination";
import { metadata } from "@/app/layout";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

  async function getBooksData(title:string, page:number) {
    //引数なしでクエリのないオブジェクトを作成
    const params = new URLSearchParams(); 

    //キーと値のペアをオブジェクトに追加
    params.append("title", title); 
    params.append("page", page.toString());

    // params.toString() で ?title=タイトル&page=ページ番号 という文字列を作成
    const response = await fetch(`http://localhost/api/books?${params.toString()}`, {
        cache: "no-store",
    });

    const booksData: BooksData = await response.json();
    return booksData;
  }

  export default async function AdminBookTable({
    title,
    page,
  }: {
    title: string;
    page: number;
  }) {
    const booksData = await getBooksData(title, page);

    return (
      <div>
        <Table>  {/* TODO:作成ボタンを実装 */}
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead>著者名</TableHead>
              <TableHead>登録日時</TableHead>
              <TableHead>登録者</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {booksData.book.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>
                  <Link href={`./author/${book.author_id}`} className={buttonVariants({variant:"link", size:"smallLink"})}>{book.author.name}</Link>
                </TableCell>
                <TableCell>{book.created_at}</TableCell>
                {book.created_user == null  ?
                  <TableCell>null</TableCell>
                  :
                  <TableCell>{book.created_user.name}</TableCell>
                }
                <TableCell>更新</TableCell> {/* TODO:更新、削除ボタンを実装 */}
                <TableCell>削除</TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination totalPages={booksData.meta.lastPage} />
      </div>
    )
  }
