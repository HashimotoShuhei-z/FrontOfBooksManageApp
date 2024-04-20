import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

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

    const booksData = await response.json();
    return booksData;
  }

  export default async function BookTable({
    title,
    page,
  }: {
    title: string;
    page: number;
  }) {
    const booksData: BooksData = await getBooksData(title, page);
    const book: Book[] = booksData.books;

    return (
      <Table>
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
          {book.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author.name}</TableCell>
              <TableCell>{book.created_at}</TableCell>
              <TableCell>{book.created_user.name}</TableCell>
              <TableCell>更新</TableCell>
              <TableCell>削除</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
