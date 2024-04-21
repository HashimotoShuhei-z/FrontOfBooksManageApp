
interface Book {
    id: number
    title: string
    author_id: number
    created_by: number
    updated_by: number
    created_at: string
    updated_at: string
    author: Author
    created_user: Admin
    updated_user: Admin
}

interface Meta {
    currentPage: number,
    lastPage: number,
    total: number

}

interface BooksData{
    books: Book[],
    meta: Meta
}

interface Author {
    id: number
    name: string  
    created_at: string
    updated_at: string
    created_by: number
    updated_by: number
    books: Book[]
    created_user: Admin
    updated_user: Admin

}

interface AuthorsData {
    authors: Author[],
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