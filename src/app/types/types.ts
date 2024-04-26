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
}

interface Meta {
  currentPage: number
  lastPage: number
  total: number
}

interface BooksData {
  book: Book[]
  meta: Meta
}

interface Author {
  id: number
  name: string
  created_at: string
  updated_at: string
  created_by: number | null
  updated_by: number | null
  book: Book[]
  created_user: Admin | null
  updated_user: Admin | null
}

interface AuthorsData {
  author: Author[]
  book: Book[]
  meta: Meta
}

interface AuthorData {
  author: Author
  book: Book[]
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
