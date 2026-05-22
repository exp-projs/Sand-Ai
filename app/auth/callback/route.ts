import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  console.log('Auth callback received code:', code ? 'present' : 'missing')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        console.log('Auth callback session exchanged successfully. Redirecting to:', next)
        return NextResponse.redirect(`${origin}${next}`)
      }
      console.error('Supabase exchangeCodeForSession error:', error.message)
    } catch (err: any) {
      console.error('Unexpected auth callback error:', err.message || err)
    }
  }

  // Redirect to homepage as a fallback instead of a non-existent error page
  return NextResponse.redirect(`${origin}${next}`)
}
