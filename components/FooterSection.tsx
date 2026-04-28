import Link from 'next/link'

export default function FooterSection() {
  return (
    <footer className="bg-sand-deepPurple text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/logo.png" 
              alt="Sand AI Logo" 
              className="w-10 h-10 object-contain invert"
            />
            <span className="font-poppins font-bold text-2xl tracking-tight">
              Sand AI
            </span>
          </Link>
          <p className="text-sand-textSecondary text-sm leading-relaxed max-w-xs">
            Empowering local businesses with cutting-edge AI tools to automate growth and engagement. Built for the future of commerce.
          </p>
          <div className="flex gap-4">
             {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
               <div key={social} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] hover:bg-sand-orange transition-colors cursor-pointer">
                 {social[0]}
               </div>
             ))}
          </div>
        </div>

        {/* Products Column */}
        <div>
          <h4 className="font-bold text-lg mb-8">Products</h4>
          <ul className="space-y-4">
            {[
              { label: 'AI Chatbot', href: '/chatbot' },
              { label: 'Social Media', href: '/social-media' },
              { label: 'AI Website', href: '/website' },
              { label: 'Mailing & Loyalty', href: '/mailing' }
            ].map(link => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-sand-textSecondary hover:text-sand-orange transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="font-bold text-lg mb-8">Company</h4>
          <ul className="space-y-4">
            {[
              { label: 'About Us', href: '#about' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Case Studies', href: '#case-studies' },
              { label: 'Blog', href: '#blog' }
            ].map(link => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-sand-textSecondary hover:text-sand-orange transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-8">
           <div>
              <h4 className="font-bold text-lg mb-4">Newsletter</h4>
              <p className="text-xs text-sand-textSecondary mb-4">Get AI tips for your business growth.</p>
              <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                 <input 
                   type="email" 
                   placeholder="Email address" 
                   className="bg-transparent border-none focus:ring-0 text-sm px-4 flex-1"
                 />
                 <button className="bg-sand-orange text-white px-4 py-2 rounded-full text-xs font-bold">Join</button>
              </div>
           </div>
           <div className="text-sm text-sand-textSecondary">
              Email: hello@sandai.com <br />
              India | UAE | Singapore
           </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-sand-textSecondary">
            © 2026 Sand AI. All rights reserved.
          </div>
          <div className="flex gap-8 text-xs text-sand-textSecondary">
             <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
