import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')

  //loginページにてトークンが存在する場合、 /admin/home または /user/home にリダイレクト
  if (token) {
    const { pathname } = req.nextUrl
    if (pathname.startsWith('/admin/login')) {
      //nextUrl.pathnameは例えばhttp://example.com/admin/loginの/admin/login部分
      return NextResponse.redirect(new URL('/admin/home', req.url))
    } else if (pathname.startsWith('/user/login')) {
      return NextResponse.redirect(new URL('/user/home', req.url))
    }
  }
  // トークンが存在しない場合、次の処理を行う
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/login', '/user/login']
}
