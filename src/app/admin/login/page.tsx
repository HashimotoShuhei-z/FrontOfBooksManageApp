import LoginForm from '@/components/partsGroups/login-form'

const page = () => {
  return (
    <main className="w-screen h-screen">
      <div className="w-screen h-screen mx-auto lg:py-16 lg:grid-cols-2 gap-8 lg:gap-16">
        <LoginForm english="admin" japanese="管理者" />
      </div>
    </main>
  )
}

export default page
