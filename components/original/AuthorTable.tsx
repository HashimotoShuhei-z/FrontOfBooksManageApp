import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  async function getAuthorsData() {
    const response = await fetch("http://localhost/api/authors", {
        cache: "no-store",
    });

    const authorsData = await response.json();
    return authorsData;
  }
  
  export default async function AuthorTable() {
    const authorsData: AuthorsData = await getAuthorsData();
    const author: Author[] = authorsData.authors;
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>著者名</TableHead>
            <TableHead></TableHead>
            <TableHead>登録者</TableHead>
            <TableHead>登録日時</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {author.map((author) => (
            <TableRow key={author.id}>
              <TableCell className="font-medium">{author.name}</TableCell>
              <TableCell></TableCell>
              <TableCell>{author.created_by}</TableCell>
              <TableCell>{author.created_at}</TableCell>
              <TableCell>a</TableCell>
              <TableCell>b</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
