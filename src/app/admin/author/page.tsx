import AdminAuthorPage from '@/components/pages/admin-author-page'

export default function Page({ searchParams }: { searchParams: { name?: string; page?: string } }) {
  return <AdminAuthorPage searchParams={searchParams} />
}
