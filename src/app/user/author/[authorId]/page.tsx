import UserAuthorDetailPage from '@/components/pages/user-author-detail-page'

export default function Page({ params }: { params: { authorId: number } }) {
  //現在のparamからauthorIDを取得して、Propsとして渡す
  return <UserAuthorDetailPage params={params.authorId} />
}
