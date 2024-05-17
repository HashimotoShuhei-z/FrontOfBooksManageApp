import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')
  const { pathname } = req.nextUrl
  //loginページにてトークンが存在する場合、 /admin/home または /user/home にリダイレクト
  if (token) {
    if (pathname.startsWith('/admin/login')) {
      //nextUrl.pathnameは例えばhttp://example.com/admin/loginの/admin/login部分
      return NextResponse.redirect(new URL('/admin/home', req.url))
    } else if (pathname.startsWith('/user/login')) {
      return NextResponse.redirect(new URL('/user/home', req.url))
    }
  } else {
    // トークンが存在しない場合、特定のパスへのアクセスを制限
    //loginページも含むと無限にリダイレクトが繰り返されるため/admin/loginと/user/loginを処理実行対象外に
    if (!pathname.endsWith('/login')) {
      const loginUrl = new URL('./login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  // トークンが存在しない場合、次の処理を行う
  return NextResponse.next()
}

// ミドルウェアが適用されるルートの設定
export const config = {
  matcher: ['/admin/login', '/user/login', '/admin/:path*', '/user/:path*']
}
