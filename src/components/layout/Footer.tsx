import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-24 pb-12 border-t border-gray-100 px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg">B</div>
              <span className="text-2xl font-black tracking-tighter">BHOOMI</span>
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed mb-10">Premium digital journalism for the modern world. Shaping conversations through deep research and unparalleled access.</p>
            <div className="flex gap-5">
              <Facebook size={20} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Instagram size={20} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Youtube size={20} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase tracking-widest text-dark">Explore Bhoomi</h4>
            <ul className="space-y-4 text-gray-500 font-bold text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Daily News</Link></li>
              <li><Link href="/magazine" className="hover:text-primary transition-colors">Digital Magazine</Link></li>
              <li><Link href="/news/1" className="hover:text-primary transition-colors">Premium Articles</Link></li>
              <li><Link href="/tariff" className="hover:text-primary transition-colors">Tariff Plans</Link></li>
              <li><Link href="/magazine" className="hover:text-primary transition-colors">Archive</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase tracking-widest text-dark">Company</h4>
            <ul className="space-y-4 text-gray-500 font-bold text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Bhoomi</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Editorial Board</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col justify-center">
            <h4 className="font-black text-2xl text-dark mb-4 leading-tight">Join our Global Community</h4>
            <p className="text-gray-400 text-sm font-medium mb-6">Get weekly insights delivered to your inbox for free.</p>
            <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-bold mb-4" />
            <button className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Get Started</button>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">&copy; 2026 Bhoomi Media Group by Aitik Official</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span className="hover:text-dark cursor-pointer transition-colors">Cookie Settings</span>
            <span className="hover:text-dark cursor-pointer transition-colors">Legal Framework</span>
            <span className="hover:text-dark cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
