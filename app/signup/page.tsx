'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await apiRequest('/auth/signup', 'POST', { 
        email, 
        password, 
        full_name: fullName 
      })
      console.log('Signup success:', data)
      router.push('/login')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      if (error) throw error
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F0F9] to-[#EDE8FA] px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-sand-border/30">
        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-8">
             <Link href="/" className="flex items-center gap-2 group">
              <span className="text-sand-purple text-2xl group-hover:scale-110 transition-transform">✦</span>
              <span className="font-poppins font-bold text-2xl text-sand-textPrimary tracking-tight">
                Sand AI
              </span>
            </Link>
          </div>

          <h2 className="text-center text-3xl font-black text-sand-textPrimary mb-2">Join Sand AI</h2>
          <p className="text-center text-sand-textSecondary font-light mb-8">Start your smarter growth journey today</p>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm mb-6 border border-red-100 italic">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-sand-textPrimary mb-2 ml-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-sand-cardPurple/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all font-medium"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-sand-textPrimary mb-2 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-sand-cardPurple/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all font-medium"
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
                className="w-full px-5 py-4 rounded-2xl bg-sand-cardPurple/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all font-medium"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sand-purple text-white font-bold py-4 rounded-2xl shadow-lg shadow-sand-purple/20 hover:bg-[#524EFA] transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {loading ? 'Creating Account...' : 'Get Started'}
              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <span className="bg-white px-4 text-sm text-sand-textSecondary relative z-10 font-medium">Or sign up with</span>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-sand-border" />
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full bg-white border border-sand-border text-sand-textPrimary font-bold py-4 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Sign up with Google
          </button>

          <p className="mt-8 text-center text-sm text-sand-textSecondary font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-sand-orange font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
