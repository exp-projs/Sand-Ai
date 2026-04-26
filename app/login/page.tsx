'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (authError) throw authError
      
      console.log('Login success:', data)
      router.push('/')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-bg px-6 py-12 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-sand-cardPurple rounded-3xl shadow-2xl overflow-hidden border border-sand-border transition-all duration-300">
        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
              <span className="font-poppins font-bold text-2xl text-sand-textPrimary tracking-tight">
                Sand AI
              </span>
            </Link>
          </div>

          <h2 className="text-center text-3xl font-black text-sand-textPrimary mb-2">Welcome Back</h2>
          <p className="text-center text-sand-textSecondary font-light mb-8">Enter your details to access your account</p>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 p-4 rounded-xl text-sm mb-6 border border-red-100 dark:border-red-900/50 italic">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-sand-textPrimary mb-2 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-sand-cardPurple/5 dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all font-medium text-sand-textPrimary"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-sand-textPrimary mb-2 ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-sand-cardPurple/5 dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all font-medium text-sand-textPrimary"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sand-orange text-white font-bold py-4 rounded-2xl shadow-lg shadow-sand-orange/20 hover:bg-[#E67A00] transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {loading ? 'Logging in...' : 'Sign In'}
              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <span className="bg-white dark:bg-sand-cardPurple px-4 text-sm text-sand-textSecondary relative z-10 font-medium transition-colors duration-300">Or continue with</span>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-sand-border" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white dark:bg-white/5 border border-sand-border text-sand-textPrimary font-bold py-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>

          <p className="mt-8 text-center text-sm text-sand-textSecondary font-medium">
            Don't have an account?{' '}
            <Link href="/signup" className="text-sand-purple font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
