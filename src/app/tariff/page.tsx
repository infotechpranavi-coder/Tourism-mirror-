"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import { motion } from '@/lib/motion';
import { Check, ShieldCheck, Zap, Star, Layout, BookOpen, Clock, Download, Share2 } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Essential',
    price: 'Free',
    description: 'Perfect for staying informed with daily headlines.',
    features: ['Daily news updates', 'Standard newsletter', 'Web access', 'Social sharing'],
    icon: Zap,
    color: 'bg-gray-50 text-gray-500'
  },
  {
    name: 'Premium',
    price: '$9.99',
    description: 'For the investigative mind craving deeper stories.',
    features: ['Everything in Essential', 'Ad-free experience', 'Deep-dive stories', 'Monthly digital magazine', 'Early access to podcasts'],
    icon: Star,
    color: 'bg-primary text-white',
    popular: true
  },
  {
    name: 'Elite',
    price: '$24.99',
    description: 'Expert analysis, archive access, and VIP events.',
    features: ['Everything in Premium', 'Full archive access', 'VIP virtual events', 'Physical magazine quarterly', 'Unlimited device sync', 'Personalized news feed'],
    icon: ShieldCheck,
    color: 'bg-dark text-white'
  }
];

export default function TariffPage() {
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
           Member Benefits & Support
         </motion.span>
         <motion.h1 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="text-5xl sm:text-7xl md:text-8xl font-black text-dark tracking-tighter leading-none mb-12"
         >
           Choose Your Access <span className="text-primary underline decoration-accent/20">level.</span>
         </motion.h1>
         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="text-gray-500 font-medium text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
         >
           Subscribe to Bhoomi and support independent, deep-dive journalism. Empowering truth with state-of-the-art reporting.
         </motion.p>
      </section>

      {/* Pricing Grid */}
      <section className="py-24 px-8 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
         {tiers.map((tier, i) => (
           <motion.div 
             key={tier.name}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className={`relative p-10 sm:p-12 rounded-[50px] sm:rounded-[64px] flex flex-col h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] group ${tier.popular ? 'border-4 border-primary ring-8 ring-primary/5 bg-white' : 'border border-gray-100 bg-gray-50'}`}
           >
              {tier.popular && (
                <div className="absolute top-8 right-8 px-4 py-1.5 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-10">
                   Most Popular
                </div>
              )}
              
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110 shadow-lg ${tier.color}`}>
                 <tier.icon size={24} />
              </div>

              <h3 className="text-3xl font-black text-dark mb-4 tracking-tighter leading-none">{tier.name}</h3>
              <div className="flex items-baseline gap-2 mb-6">
                 <span className="text-5xl font-black text-dark tracking-tighter">{tier.price}</span>
                 {tier.price !== 'Free' && <span className="text-gray-400 font-bold text-sm">/month</span>}
              </div>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-10">{tier.description}</p>
              
              <div className="space-y-6 flex-1">
                 {tier.features.map(feat => (
                    <div key={feat} className="flex items-center gap-4 text-sm font-bold text-gray-700">
                       <Check size={18} className="text-accent shrink-0" />
                       <span>{feat}</span>
                    </div>
                 ))}
              </div>

              <button className={`w-full mt-12 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95 ${tier.popular ? 'bg-primary text-white hover:bg-dark hover:shadow-primary/20' : 'bg-white text-dark hover:bg-primary hover:text-white border border-gray-100'}`}>
                 Get Started
              </button>
           </motion.div>
         ))}
      </section>

      {/* FAQ Mini Section */}
      <section className="py-24 px-8 max-w-[1440px] mx-auto text-center">
         <h2 className="text-3xl font-black text-dark mb-16 tracking-tighter">Frequently Asked <span className="text-accent underline">Questions.</span></h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes, no contracts.', icon: Clock },
              { q: 'Is there a physical copy?', a: 'Elite tier includes it quarterly.', icon: BookOpen },
              { q: 'Group discounts?', a: 'Contact us for corporate plans.', icon: Share2 },
              { q: 'Offline reading?', a: 'Download pdfs on mobile app.', icon: Download }
            ].map((faq, i) => (
              <div key={i} className="space-y-4">
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl mx-auto flex items-center justify-center text-primary border border-gray-100"><faq.icon size={20} /></div>
                 <h4 className="text-lg font-black text-dark">{faq.q}</h4>
                 <p className="text-gray-400 text-sm font-medium">{faq.a}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
