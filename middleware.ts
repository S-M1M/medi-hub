import { getDataFromToken } from './utils/getDataFromToken';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verify-email'

  const token = request.cookies.get('token')?.value || ''
  console.log("TOKEN:", request.cookies.get("token"));

  const userRole = getDataFromToken(request);
  console.log("USER ROLE FROM TOKEN:", userRole);
  

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/',
    '/patient/:path*',
    '/hospital/:path*',
    '/login',
    '/signup',
  ]
}