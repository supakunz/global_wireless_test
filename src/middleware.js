import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const user = await getToken({ /**ถ้า secret key ตรงกันกับ token จะได้ data ของ user */
    req: request, //แกะ token จาก request
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Get the pathname of the request
  const { pathname } = request.nextUrl
  //** */ ถ้าอยู่หน้า dashboard ไม่มี user(session) จะ redirect ไปหน้า / **
  if (
    pathname.startsWith('/dashboard') &&
    (!user) // || user.role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Continue with the request if the user is an admin or the route is not protected
  return NextResponse.next()
}