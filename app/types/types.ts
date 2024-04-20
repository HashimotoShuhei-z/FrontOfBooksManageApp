
interface Book {
    id: number
    title: string
    author_id: number
    created_by: number
    updated_by: number
    created_at: number
    updated_at: number
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
    created_at: number
    updated_at: number
    created_by: number
    updated_by: number
}

interface AuthorsData {
    authors: Author[]
}

interface placeholder {
    placeholder: string
}