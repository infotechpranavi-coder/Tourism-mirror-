"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import { motion } from '@/lib/motion';
import { Award, Globe, Heart, Shield, Users, Zap, Youtube, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

const leadershipTeam = [
  {
    name: 'Aitik Official',
    role: 'Founder & Editor',
    image: 'https://images.unsplash.com/photo-1504712598893-24159a89200e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Sarah Drasner',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Mark J. Wilson',
    role: 'Editorial Board',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Elena Vance',
    role: 'Editorial Board',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white pb-32">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-[200px] px-8 max-w-[1440px] mx-auto text-center">
         <motion.span 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-accent text-[13px] font-black uppercase tracking-[0.4em] mb-10 block"
         >
           Our Legacy & Future
         </motion.span>
         <motion.h1 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-black text-dark tracking-tighter leading-[0.9] mb-16"
         >
           Bhoomi: Reinventing Digital <span className="text-primary">Journalism.</span>
         </motion.h1>
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4 }}
           className="relative aspect-video max-w-6xl mx-auto rounded-[60px] overflow-hidden shadow-2xl shadow-primary/20"
         >
           <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" alt="Bhoomi Office" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-dark/20 backdrop-blur-[2px] flex items-center justify-center">
              <button className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center text-primary shadow-2xl hover:scale-110 active:scale-95 transition-all">
                 <Zap size={32} />
              </button>
           </div>
         </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
         <div className="space-y-10">
            <h2 className="text-4xl sm:text-6xl font-black text-dark tracking-tighter leading-none mb-8">Guided by Truth, Powered by <span className="text-accent italic">Technology.</span></h2>
            <p className="text-gray-500 font-medium text-lg sm:text-xl leading-relaxed">Bhoomi was founded in 2024 with a single mission: to cut through the digital noise and deliver journalism that matters. We believe that in the age of generative AI and rapid misinformation, human-verified, deep-dive reporting is more critical than ever.</p>
            <div className="pt-10 grid grid-cols-2 gap-10">
               <div>
                  <h4 className="text-4xl font-black text-primary mb-2">450K+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Monthly Readers</p>
               </div>
               <div>
                  <h4 className="text-4xl font-black text-primary mb-2">50+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Award Nominations</p>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-8">
            <div className="space-y-8 mt-12">
               <div className="bg-gray-50 p-10 rounded-[40px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                  <Shield size={32} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-black text-dark mb-4">Ethical Core</h3>
                  <p className="text-gray-400 text-sm font-bold leading-relaxed">Uncompromising integrity in every story we publish.</p>
               </div>
               <div className="bg-gray-50 p-10 rounded-[40px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                  <Globe size={32} className="text-accent mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-black text-dark mb-4">Global Reach</h3>
                  <p className="text-gray-400 text-sm font-bold leading-relaxed">Reporting that transcends borders and connects us all.</p>
               </div>
            </div>
            <div className="space-y-8">
               <div className="bg-gray-50 p-10 rounded-[40px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                  <Heart size={32} className="text-red-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-black text-dark mb-4">Human First</h3>
                  <p className="text-gray-400 text-sm font-bold leading-relaxed">Centering the human experience in every narrative.</p>
               </div>
               <div className="bg-gray-50 p-10 rounded-[40px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                  <Award size={32} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-black text-dark mb-4">Excellence</h3>
                  <p className="text-gray-400 text-sm font-bold leading-relaxed">Striving for the highest quality in digital media.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-dark rounded-[60px] sm:rounded-[100px] mx-4 sm:mx-8 px-8 sm:px-20 text-white overflow-hidden relative">
         <div className="absolute top-20 right-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px]"></div>
         <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-8 italic">The Visionaries</h2>
            <p className="text-white/60 text-lg sm:text-xl font-medium leading-relaxed">A team of seasoned editors, tech innovators, and creative directors working together to shape the future of media.</p>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {leadershipTeam.map((member) => (
               <div key={member.name} className="group cursor-pointer">
                  <div className="aspect-[4/5] rounded-[40px] overflow-hidden mb-8 border-2 border-white/5 group-hover:border-primary transition-all">
                     <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                  </div>
                  <h4 className="text-2xl font-black mb-2 tracking-tight">{member.name}</h4>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest">{member.role}</p>
                  <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Twitter size={14} className="hover:text-primary transition-colors" />
                     <Youtube size={14} className="hover:text-primary transition-colors" />
                     <Instagram size={14} className="hover:text-primary transition-colors" />
                  </div>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
