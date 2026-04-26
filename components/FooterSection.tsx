export default function FooterSection() {
  return (
    <footer>

      {/* Main Dark Footer */}
      <div className="bg-[#151B1E] py-8 text-sand-textSecondary border-t border-[#1f282d]">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 group">
             <img 
              src="/logo.png" 
              alt="Sand AI Logo" 
              className="w-8 h-8 object-contain"
            />
             <span className="font-poppins font-bold text-lg text-white tracking-tight">
               sand AI
             </span>
          </div>
          
          <div className="text-xs md:text-sm text-center md:text-left">
            Design System & Layout Guide for sand AI — Built for Clarity. Designed for Developers.
          </div>

          <div className="text-xs flex items-center gap-4">
            <span>Version 1.0</span>
            <span className="w-px h-3 bg-gray-700"></span>
            <span>May 2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
