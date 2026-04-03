"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import { motion } from '@/lib/motion';
import { BookOpen, Calendar, ChevronRight, Layout, Star, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

const magazineImages = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba',
  'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
  'https://images.unsplash.com/photo-1504712598893-24159a89200e',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e',
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  'https://images.unsplash.com/photo-1509395176047-4a66953fd231',
];

const magazineEditions = [
  { id: '1', month: 'October 2026', title: 'The Quantum Leap', image: `${magazineImages[0]}?q=80&w=2070&auto=format&fit=crop`, featured: true },
  { id: '2', month: 'September 2026', title: 'Urban Ecosystems', image: `${magazineImages[1]}?q=80&w=2070&auto=format&fit=crop` },
  { id: '3', month: 'August 2026', title: 'Beyond Silicon', image: `${magazineImages[2]}?q=80&w=2070&auto=format&fit=crop` },
  { id: '4', month: 'July 2026', title: 'Human Interface', image: `${magazineImages[3]}?q=80&w=2070&auto=format&fit=crop` },
];

export default function MagazinePage() {
  return (
    <div className="bg-white min-h-screen pb-32">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-[180px] px-8 max-w-[1440px] mx-auto">
         <div className="flex flex-col xl:flex-row items-end justify-between gap-12 mb-16 pb-16 border-b border-gray-100">
            <div className="max-w-3xl">
               <span className="text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-6 block">Bhoomi Quarterly Digital</span>
               <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black text-dark tracking-tighter leading-none mb-10">Immersive <span className="text-accent underline decoration-primary/10">Editions.</span></h1>
               <p className="text-gray-500 font-medium text-lg leading-relaxed">Experience journalism with high-resolution imagery, cinematic motion, and deep investigative pieces. Our magazine is designed for those who seek to understand the layers beneath the headlines.</p>
            </div>
            
            <div className="flex items-center gap-6 w-full xl:w-auto">
               <button className="flex-1 xl:w-[280px] py-6 bg-dark text-white rounded-[24px] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all hover:bg-primary hover:shadow-2xl shadow-dark/20 active:scale-95 leading-none">
                  <BookOpen size={18} /> View Current Issue
               </button>
               <button className="p-6 bg-gray-50 text-gray-400 hover:text-primary rounded-[24px] transition-all border border-transparent hover:border-gray-200">
                  <Star size={24} />
               </button>
            </div>
         </div>
      </section>

      {/* Hero Issue */}
      <section className="px-8 max-w-[1440px] mx-auto mb-32">
         <div className="relative group rounded-[60px] overflow-hidden aspect-[4/5] sm:aspect-video shadow-2xl shadow-primary/20 bg-dark">
            <img src={magazineEditions[0].image} className="w-full h-full object-cover transition-transform duration-[15s] ease-linear group-hover:scale-110 opacity-70" alt="Issue Cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 sm:p-20 flex flex-col justify-end">
               <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
                  <span className="px-6 py-2 bg-accent text-white text-xs font-black uppercase tracking-widest rounded-full shadow-2xl">New Release</span>
                  <div className="flex items-center gap-3 text-white/50 text-[10px] sm:text-xs font-black uppercase tracking-widest">
                     <Calendar size={18} className="text-white/40" /> {magazineEditions[0].month} Issue
                  </div>
               </div>
               <h2 className="text-5xl sm:text-8xl font-black text-white leading-none tracking-tighter mb-10">{magazineEditions[0].title}</h2>
               <div className="flex flex-wrap gap-8 items-center">
                  <button className="px-12 py-5 bg-white text-dark font-black uppercase tracking-widest text-xs rounded-full hover:bg-primary hover:text-white transition-all shadow-2xl active:scale-95">Read Online</button>
                  <button className="text-white hover:text-accent font-black uppercase tracking-widest text-xs tracking-[0.2em] flex items-center gap-3 transition-colors">Download PDF <ChevronRight size={18} /></button>
               </div>
            </div>
         </div>
      </section>

      {/* Archive Grid */}
      <section className="px-8 max-w-[1440px] mx-auto">
         <div className="flex items-center justify-between mb-16 px-4">
            <h3 className="text-3xl font-black text-dark tracking-tighter italic">Edition Archive</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-accent transition-all flex items-center gap-2">View Full Archive <ChevronRight size={14} /></button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
            {magazineEditions.slice(1).concat(magazineEditions.slice(1)).map((ed, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="group cursor-pointer flex flex-col h-full"
               >
                  <div className="aspect-[3/4] relative rounded-[40px] overflow-hidden mb-10 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-700 bg-gray-100">
                     <img src={ed.image} alt={ed.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                     <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-all duration-700 shadow-2xl"><Zap size={24} /></div>
                     </div>
                  </div>
                  <div className="px-6 flex flex-col flex-1">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-3">{ed.month}</span>
                     <h4 className="text-3xl font-black text-dark tracking-tighter mb-8 leading-none group-hover:text-primary transition-colors">{ed.title} Edition</h4>
                     <button className="mt-auto px-8 py-3 bg-gray-50 text-gray-400 font-black uppercase tracking-widest text-[9px] rounded-xl hover:bg-white hover:text-primary border border-transparent hover:border-gray-100 transition-all">View Details</button>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Featured Articles Slider */}
      <section className="mt-40 bg-gray-50 py-32 px-8 overflow-hidden rounded-[80px] mx-8">
         <div className="max-w-[1440px] mx-auto">
            <h2 className="text-4xl sm:text-6xl font-black text-dark tracking-tighter leading-none mb-24 px-8 text-center sm:text-left underline decoration-primary/10">Curated Monthly <span className="text-primary italic">Collections.</span></h2>
            
            <div className="flex gap-12 overflow-x-auto no-scrollbar scroll-smooth">
               {[1, 2, 3, 4].map(i => (
                  <div key={i} className="min-w-[400px] sm:min-w-[550px] bg-white rounded-[50px] p-12 shadow-sm border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group flex flex-col sm:flex-row gap-10">
                     <div className="w-full sm:w-48 h-48 rounded-[32px] overflow-hidden shrink-0 bg-gray-100">
                        <img src={`${magazineImages[(i + 5) % magazineImages.length]}?q=80&w=2070&auto=format&fit=crop`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     </div>
                     <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-4">Collection #{i}</span>
                        <h3 className="text-2xl font-black text-dark leading-tight group-hover:text-primary transition-colors mb-6">The intersection of AI, Sustainability and Modern Urban Decay</h3>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-2">A set of stories gathered to provide a holistic view of today's most pressing architectural questions.</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
