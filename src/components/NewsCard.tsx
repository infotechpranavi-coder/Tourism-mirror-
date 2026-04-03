"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from '@/lib/motion';
import { Clock, Eye, Share2, Tag } from 'lucide-react';

interface NewsCardProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  excerpt: string;
  date: string;
  views?: number;
  featured?: boolean;
}

export default function NewsCard({ id, title, slug, image, category, excerpt, date, views = 1200, featured = false }: NewsCardProps) {
  const formattedViews = new Intl.NumberFormat('en-US').format(views);
  const newsHref = `/news/${slug || id}`;

  if (featured) {
    return (
      <motion.div 
        whileHover={{ y: -8 }}
        className="group relative h-[400px] sm:h-[500px] xl:h-[600px] w-full rounded-[20px] sm:rounded-[32px] overflow-hidden shadow-2xl shadow-primary/20 bg-dark"
      >
        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-6 sm:p-12 w-full">
          <Link href={`/category/${category.toLowerCase()}`} className="inline-block px-4 py-1.5 bg-accent text-white text-[11px] font-black uppercase tracking-widest rounded-full mb-6 hover:bg-white hover:text-accent transition-all">
            {category}
          </Link>
          <Link href={newsHref}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tighter mb-6 group-hover:text-accent transition-colors">
              {title}
            </h2>
          </Link>
          <div className="flex items-center gap-6 text-white/60 text-xs sm:text-sm font-bold">
            <span className="flex items-center gap-2 uppercase tracking-wide"><Clock size={16} className="text-accent" /> {date}</span>
            <span className="flex items-center gap-2 uppercase tracking-wide"><Eye size={16} className="text-white/40" /> {formattedViews}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full"
    >
      <div className="relative h-48 sm:h-56 xl:h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4">
           <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
             {category}
           </span>
        </div>
      </div>
      
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
           <span className="flex items-center gap-1.5"><Clock size={14} className="text-accent" /> {date}</span>
           <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
           <span className="flex items-center gap-1.5">{formattedViews} Views</span>
        </div>
        <Link href={newsHref}>
          <h3 className="text-xl sm:text-2xl font-black text-dark leading-tight group-hover:text-primary transition-colors flex-1 line-clamp-3">
            {title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mt-4 line-clamp-2 leading-relaxed font-medium">
          {excerpt}
        </p>
        <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
           <Link href={newsHref} className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
             Read Full Story <span className="text-accent">→</span>
           </Link>
           <button className="text-gray-300 hover:text-primary transition-colors hover:scale-110 active:scale-95">
             <Share2 size={18} />
           </button>
        </div>
      </div>
    </motion.div>
  );
}
