import React from 'react'
import { Mail } from 'lucide-react';

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-4 pt-4" data-testid="social-links">
      {/* WhatsApp Community - High Priority */}
      <a 
        href="https://chat.whatsapp.com/Hcl3srYljmMFnU7aOsMLWH" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center hover:bg-teal-100 transition-all hover:scale-110" 
        aria-label="WhatsApp Community"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.891-5.446 0-9.884 4.434-9.887 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.74-.982zM15.898 16.535c-.328-.164-1.94-.957-2.24-.1.065-.3-.383-.711-.547-.82-.163-.11-.327-.164-.547.164-.218.327-.846 1.066-1.037 1.284-.191.218-.382.246-.71.082-.328-.164-1.386-.511-2.641-1.63-1.0.88-1.72-1.802-1.942-2.18-.22-.38-.02-.58.17-.77.17-.17.38-.44.57-.65.2-.22.25-.37.38-.61.13-.24.06-.46-.03-.65-.09-.19-.84-2.046-1.15-2.783-.3-.728-.61-.63-.84-.64-.22-.01-.46-.01-.71-.01s-.65.09-.98.46c-.33.35-1.25 1.23-1.25 2.98s1.28 3.44 1.46 3.68c.18.25 2.5 3.82 6.07 5.36.85.36 1.51.58 2.03.75.86.27 1.64.23 2.26.14.69-.1 2.24-.91 2.55-1.8.32-.88.32-1.64.22-1.8-.1-.16-.38-.25-.71-.41z"/>
        </svg>
      </a>

      {/* LinkedIn */}
      <a href="#" className="w-10 h-10 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all hover:scale-110" aria-label="LinkedIn">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </a>

      {/* Email */}
      <a href="mailto:support@marketacad.com" className="w-10 h-10 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all hover:scale-110" aria-label="Email Support">
        <Mail className="w-5 h-5" />
      </a>

      {/* YouTube */}
      <a href="#" className="w-10 h-10 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all hover:scale-110" aria-label="YouTube Channel">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
      </a>
    </div>
  )
}
