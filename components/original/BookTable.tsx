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
  
  async function getBooksData() {
    const response = await fetch("http://localhost/api/books", {
        cache: "no-store",
    });

    const booksData = await response.json();
    return booksData;
  }
  
  export default async function BookTable() {
    const booksData: BooksData = await getBooksData();
    const book: Book[] = booksData.books;
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>タイトル</TableHead>
            <TableHead>著者名</TableHead>
            <TableHead>登録者</TableHead>
            <TableHead>登録日時</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {book.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author_id}</TableCell>
              <TableCell>{book.created_by}</TableCell>
              <TableCell>{book.created_at}</TableCell>
              <TableCell>a</TableCell>
              <TableCell>b</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  