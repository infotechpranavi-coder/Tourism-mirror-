"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import { motion } from '@/lib/motion';
import { MapPin, Phone, Mail, MessageSquare, Send, Globe, Facebook, Twitter, Instagram, Youtube, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pb-32">
      <Header />
      
      {/* Hero Header */}
      <section className="pt-[180px] px-8 max-w-[1440px] mx-auto text-center space-y-10">
         <motion.span 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-accent text-[11px] font-black uppercase tracking-[0.4em] mb-6 block"
         >
           Get in Touch
         </motion.span>
         <motion.h1 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="text-5xl sm:text-7xl md:text-8xl font-black text-dark tracking-tighter leading-none mb-12"
         >
           Let’s Start a <span className="text-primary underline decoration-accent/20">Conversation.</span>
         </motion.h1>
         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="text-gray-500 font-medium text-lg sm:text-l max-w-3xl mx-auto leading-relaxed"
         >
           Whether you have a story tip, a partnership inquiry, or just want to say hello, we’re here to listen and engage.
         </motion.p>
      </section>

      {/* Contact Grid */}
      <section className="py-24 px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
         
         {/* Contact Form */}
         <div className="lg:col-span-7 bg-gray-50 p-10 sm:p-20 rounded-[60px] shadow-sm border border-gray-100">
            <h2 className="text-3xl sm:text-4xl font-black text-dark mb-12 tracking-tighter">Send us a Message</h2>
            <form className="space-y-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                     <input type="text" placeholder="John Doe" className="w-full px-8 py-5 bg-white border-transparent focus:border-primary/20 rounded-[28px] outline-none shadow-sm transition-all font-bold text-sm" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                     <input type="email" placeholder="john@example.com" className="w-full px-8 py-5 bg-white border-transparent focus:border-primary/20 rounded-[28px] outline-none shadow-sm transition-all font-bold text-sm" />
                  </div>
               </div>
               
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                  <select className="w-full px-8 py-5 bg-white border-transparent focus:border-primary/20 rounded-[28px] outline-none shadow-sm transition-all font-bold text-sm appearance-none">
                     <option value="">Choose a Topic</option>
                     <option value="story">Submit a Story Tip</option>
                     <option value="ads">Advertisement Inquiry</option>
                     <option value="support">Technical Support</option>
                     <option value="other">Other</option>
                  </select>
               </div>
               
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Your Message</label>
                  <textarea rows={6} placeholder="Tell us more about your inquiry..." className="w-full px-8 py-6 bg-white border-transparent focus:border-primary/20 rounded-[32px] outline-none shadow-sm transition-all font-bold text-sm resize-none"></textarea>
               </div>
               
               <button className="px-12 py-6 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-4 hover:bg-dark hover:shadow-2xl transition-all shadow-xl shadow-primary/10 active:scale-95 group">
                  Send Message <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
               </button>
            </form>
         </div>

         {/* Contact Info Sidebar */}
         <div className="lg:col-span-5 space-y-12 py-10">
            <div className="space-y-12">
               <div className="flex gap-10">
                  <div className="w-16 h-16 bg-blue-50 text-primary rounded-[24px] flex items-center justify-center shrink-0 shadow-sm border border-blue-100"><MapPin size={24} /></div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-black text-dark tracking-tight">Main Office</h4>
                     <p className="text-gray-400 font-bold text-sm leading-relaxed">123 Media Plaza, Digital District, <br />NY 10001, United States</p>
                  </div>
               </div>
               <div className="flex gap-10">
                  <div className="w-16 h-16 bg-orange-50 text-accent rounded-[24px] flex items-center justify-center shrink-0 shadow-sm border border-orange-100"><Phone size={24} /></div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-black text-dark tracking-tight">Direct Calls</h4>
                     <p className="text-gray-400 font-bold text-sm leading-relaxed">+1 (800) 123-4567 <br />Mon-Fri, 9am - 6pm EST</p>
                  </div>
               </div>
               <div className="flex gap-10">
                  <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-[24px] flex items-center justify-center shrink-0 shadow-sm border border-purple-100"><Mail size={24} /></div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-black text-dark tracking-tight">Digital Mail</h4>
                     <p className="text-gray-400 font-bold text-sm leading-relaxed">contact@bhoomi.com <br />editorial@bhoomi.com</p>
                  </div>
               </div>
            </div>

            <div className="pt-16 border-t border-gray-100 space-y-10">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Join our Network</h4>
               <div className="flex flex-wrap gap-4">
                  {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                     <button key={i} className="p-5 bg-white border border-gray-100 text-gray-400 hover:bg-primary hover:text-white hover:border-primary rounded-[20px] transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-95">
                        <Icon size={24} />
                     </button>
                  ))}
               </div>
               <p className="text-gray-300 font-bold text-xs leading-relaxed max-w-xs uppercase tracking-widest">Follow us on social media for real-time updates and exclusive digital content previews.</p>
            </div>
            
            <div className="bg-dark rounded-[50px] p-10 text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
               <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-black leading-tight tracking-tighter">Careers at <br />Bhoomi Group</h3>
                  <p className="text-white/40 text-xs font-bold leading-relaxed mb-6">We are always looking for visionary writers, data analysts and creative engineers.</p>
                  <Link href="/about" className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2 group-hover:gap-4 transition-all">Join our team <ChevronRight size={18} /></Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
