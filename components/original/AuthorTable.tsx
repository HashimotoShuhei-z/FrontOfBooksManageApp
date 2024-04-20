import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  async function getAuthorsData(name:string, page:number) {
    //引数なしでクエリのないオブジェクトを作成
    const params = new URLSearchParams(); 

    //キーと値のペアをオブジェクトに追加
    params.append("name", name); 
    params.append("page", page.toString());

    // params.toString() で ?title=タイトル&page=ページ番号 という文字列を作成
    const response = await fetch(`http://localhost/api/authors?${params.toString()}`, {
        cache: "no-store",
    });

    const authorsData = await response.json();
    return authorsData;
  }
  
  export default async function AuthorTable({
    name,
    page,
  }: {
    name: string;
    page: number;
  }) {
    const authorsData: AuthorsData = await getAuthorsData(name,page);
    const author: Author[] = authorsData.authors;
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>著者名</TableHead>
            <TableHead></TableHead>
            <TableHead>登録日時</TableHead>
            <TableHead>登録者</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {author.map((author) => (
            <TableRow key={author.id}>
              <TableCell className="font-medium">{author.name}</TableCell>
              <TableCell></TableCell>
              <TableCell>{author.created_at}</TableCell>
              <TableCell>{author.created_user.name}</TableCell>
              <TableCell>更新</TableCell>
              <TableCell>削除</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
