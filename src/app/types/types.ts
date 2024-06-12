interface Book {
  id: number
  title: string
  author_id: number
  created_by: number | null
  updated_by: number | null
  created_at: string
  updated_at: string
  author: Author
  created_user: Admin | null
  updated_user: Admin | null
  //components プロパティを関数として定義し、そのコンポーネントが必要な props を受け取れるようにする
  components: (book: Book) => React.ReactNode[]
}

interface Meta {
  currentPage: number
  lastPage: number
  total: number
}

interface BooksData {
  book: Book[]
  meta: Meta | undefined
}

interface Author {
  id: number
  name: string
  created_at: string
  updated_at: string
  created_by: number | null
  updated_by: number | null
  books: Book[]
  created_user: Admin | null
  updated_user: Admin | null
  components: (author: Author) => React.ReactNode[]
}

interface AuthorsData {
  author: Author[] | undefined
  meta: Meta | undefined
}

interface AuthorData {
  author: Author
  books: Book[]
  meta: Meta
}

interface Admin {
  id: number
  name: string
  email: string
  email_verified_at: string
  created_at: string
  updated_at: string
}

interface placeholder {
  placeholder: string
}
