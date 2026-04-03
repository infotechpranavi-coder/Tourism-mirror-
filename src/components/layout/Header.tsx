"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from '@/lib/motion';
import { Search, Menu, X, Facebook, Twitter, Instagram, Youtube, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Tariff', href: '/tariff' },
  { name: 'Magazine', href: '/magazine' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-dark text-white text-[10px] sm:text-xs py-1.5 px-4 sm:px-6 hidden md:flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 opacity-80"><span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span> Trending</span>
          <div className="overflow-hidden w-[400px]">
            <motion.p 
              animate={{ x: [400, -800] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="whitespace-nowrap font-medium"
            >
              Latest: Global climate summit sets new targets for renewable energy transition... 
              Market breakthrough in zero-emission aviation technology...
            </motion.p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <Facebook size={14} className="cursor-pointer" />
            <Twitter size={14} className="cursor-pointer" />
            <Instagram size={14} className="cursor-pointer" />
            <Youtube size={14} className="cursor-pointer" />
          </div>
          <div className="w-px h-3 bg-white/20 mx-2"></div>
          <Link href="/admin/login" className="flex items-center gap-2 hover:text-accent transition-colors">
            <User size={14} /> Admin Login
          </Link>
        </div>
      </div>

      {/* Main NavBar */}
      <nav className={`transition-all duration-500 border-b ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-gray-200 py-2 py-3' : 'bg-white border-transparent py-4 sm:py-6'}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <Image
              src="/WhatsApp_Image_2026-04-01_at_11.33.21_AM-removebg-preview.png"
              alt="The Tourism Mirror"
              width={828}
              height={317}
              priority
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-14 lg:h-16"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative px-1 text-sm font-bold uppercase tracking-tight text-dark/80 hover:text-primary transition-all group ${pathname === link.href ? 'text-primary' : ''}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group hidden sm:block">
              <Search size={22} className="text-dark/70 group-hover:text-primary transition-colors" />
            </button>
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
            <button className="hidden sm:block px-6 py-2.5 bg-primary hover:bg-dark text-white font-black text-[13px] uppercase tracking-wider rounded-full transition-all shadow-lg shadow-primary/10 hover:shadow-primary/20 scale-100 active:scale-95">
              Subscribe
            </button>
            
            {/* Mobile Menu Btn */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2 rounded-lg bg-gray-50 text-dark border border-gray-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-0 bg-white z-[60] overflow-y-auto px-6 py-12"
          >
            <div className="flex items-center justify-between mb-12">
               <Image
                 src="/WhatsApp_Image_2026-04-01_at_11.33.21_AM-removebg-preview.png"
                 alt="The Tourism Mirror"
                 width={828}
                 height={317}
                 priority
                 className="h-12 w-auto object-contain"
               />
               <button onClick={() => setIsOpen(false)}><X size={32} /></button>
            </div>
            
            <div className="space-y-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block text-4xl font-extrabold text-dark hover:text-primary tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-16 pt-10 border-t border-gray-100 space-y-6 text-gray-400">
               <p className="text-xs font-black uppercase tracking-widest">Follow Us</p>
               <div className="flex gap-6">
                <Facebook size={24} />
                <Twitter size={24} />
                <Instagram size={24} />
                <Youtube size={24} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
