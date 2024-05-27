import AdminAuthorDetailPage from '@/components/pages/admin-author-detail-page'

export default function Page({ params }: { params: { authorId: number } }) {
  //現在のparamからauthorIDを取得して、Propsとして渡す
  return <AdminAuthorDetailPage params={params.authorId} />
}
