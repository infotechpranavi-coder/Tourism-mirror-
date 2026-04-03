"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import NewsCard from '@/components/NewsCard';
import { motion, AnimatePresence } from '@/lib/motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ContentPost } from '@/lib/content';

interface HomePageClientProps {
  featuredNews: ContentPost[];
  trendingNews: ContentPost[];
  latestNews: ContentPost[];
  categorySections: Array<{
    categorySlug: string;
    categoryName: string;
    posts: ContentPost[];
  }>;
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const homeCardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: index * 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HomePageClient({
  featuredNews,
  trendingNews,
  latestNews,
  categorySections,
}: HomePageClientProps) {
  const safeFeaturedNews = featuredNews.filter(
    (story): story is ContentPost => Boolean(story?.slug && story?.title && story?.image)
  );
  const safeTrendingNews = trendingNews.filter(
    (story): story is ContentPost => Boolean(story?.slug && story?.title && story?.image)
  );
  const safeLatestNews = latestNews.filter(
    (story): story is ContentPost => Boolean(story?.slug && story?.title && story?.image)
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const allStories = [
    ...safeFeaturedNews,
    ...safeTrendingNews,
    ...safeLatestNews,
  ];

  useEffect(() => {
    if (safeFeaturedNews.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % safeFeaturedNews.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [safeFeaturedNews.length]);

  const activeStory = safeFeaturedNews[currentSlide] || safeFeaturedNews[0];

  if (!activeStory) {
    return (
      <div className="bg-white min-h-screen">
        <Header />

        <section className="pt-[180px] px-4 sm:px-8 max-w-[1100px] mx-auto pb-24">
          <div className="rounded-[44px] border border-gray-100 bg-[linear-gradient(135deg,#ffffff_0%,#f7f9fc_100%)] p-10 sm:p-16 shadow-[0_20px_80px_rgba(16,24,40,0.06)]">
            <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-accent">
              Newsroom Ready
            </span>
            <h1 className="mt-8 text-4xl sm:text-6xl font-black tracking-[-0.06em] text-dark leading-none">
              Publish your first story to power the homepage.
            </h1>
            <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-gray-500">
              The homepage is now connected to MongoDB, so it only shows published stories. Right now there are no published items available, which is why the page had nothing to render.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/admin/posts/new"
                className="rounded-full bg-primary px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:bg-dark"
              >
                Create And Publish
              </Link>
              <Link
                href="/admin/posts"
                className="rounded-full border border-gray-200 bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-dark transition-all hover:border-primary hover:text-primary"
              >
                Open Admin Posts
              </Link>
            </div>
          </div>

          {allStories.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-black text-dark tracking-tight mb-8">Available Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {allStories.slice(0, 6).map((post) => (
                  <NewsCard
                    key={post.slug}
                    id={post.id}
                    slug={post.slug}
                    title={post.title}
                    image={post.image}
                    category={post.category}
                    excerpt={post.excerpt}
                    date={post.date}
                    views={post.views}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Header />

      <section className="pt-[140px] px-4 sm:px-8 max-w-[1440px] mx-auto min-h-screen">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 relative group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.slug}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-[40px] h-[500px] sm:h-[600px] xl:h-[700px]"
              >
                <img
                  src={activeStory.image}
                  alt={activeStory.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-linear scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 sm:p-16 w-full max-w-4xl">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="px-4 py-1.5 bg-accent text-white text-xs font-black uppercase tracking-widest rounded-full mb-6 inline-block"
                  >
                    {activeStory.category}
                  </motion.span>
                  <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl sm:text-6xl xl:text-7xl font-black text-white leading-tight tracking-[calc(-0.04em)] mb-8"
                  >
                    {activeStory.title}
                  </motion.h1>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-6"
                  >
                    <Link
                      href={`/news/${activeStory.slug}`}
                      className="px-8 py-4 bg-white text-dark font-black uppercase tracking-wider rounded-full hover:bg-accent hover:text-white transition-all scale-100 active:scale-95 shadow-2xl"
                    >
                      Explore Story
                    </Link>
                    <div className="flex gap-2">
                      {safeFeaturedNews.map((story, index) => (
                        <button
                          onClick={() => setCurrentSlide(index)}
                          key={story.slug}
                          className={`h-1.5 transition-all duration-500 rounded-full ${
                            currentSlide === index ? 'w-10 bg-accent' : 'w-4 bg-white/30'
                          }`}
                        ></button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-dark uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="text-accent" /> Trending
              </h2>
              <Link href="/news" className="text-xs font-bold text-gray-400 hover:text-primary uppercase tracking-widest">
                More
              </Link>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4"
            >
              {safeTrendingNews.map((news, idx) => (
                <motion.div
                  key={news.slug}
                  custom={idx}
                  variants={homeCardReveal}
                  whileHover={{ x: 8, y: -4 }}
                  className="group bg-gray-50 rounded-2xl p-4 flex gap-4 cursor-pointer hover:bg-white border border-transparent hover:border-gray-100 shadow-sm transition-all"
                >
                  <Link href={`/news/${news.slug}`} className="contents">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none mb-2">{news.category}</span>
                      <h3 className="text-sm font-bold text-dark leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-2 font-medium">{news.date}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="bg-primary rounded-[32px] p-8 text-white mt-10 relative overflow-hidden group"
            >
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full scale-150 group-hover:scale-175 transition-transform duration-1000"></div>
              <h3 className="text-2xl font-black leading-tight mb-4 relative z-10">Stay Informed Every Day</h3>
              <p className="text-white/70 text-sm mb-6 font-medium relative z-10 leading-relaxed">Join readers who want curated insights every morning.</p>
              <div className="space-y-3 relative z-10">
                <input type="email" placeholder="Your email address" className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white focus:text-dark outline-none transition-all text-sm font-bold" />
                <button className="w-full py-3 bg-accent hover:bg-white hover:text-accent font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 text-xs">Join Today</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-8 max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-16 gap-6 flex-wrap">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-6xl font-black text-dark tracking-tighter leading-none mb-6">Fresh From The Desk</h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed">Published stories now flow from MongoDB into the homepage, category desks, and the article detail pages.</p>
          </div>
          <Link href="/news" className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary hover:text-accent transition-all pb-2 border-b-2 border-primary/10 hover:border-accent/40">
            Explore All News <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-12"
        >
          {safeLatestNews.map((post, index) => (
            <motion.div key={post.slug} custom={index} variants={homeCardReveal}>
              <NewsCard
                id={post.id}
                slug={post.slug}
                title={post.title}
                image={post.image}
                category={post.category}
                excerpt={post.excerpt}
                date={post.date}
                views={post.views}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-4 sm:px-8 max-w-[1440px] mx-auto pb-24 space-y-24">
        {categorySections.map((section, sectionIndex) => (
          <div key={section.categorySlug}>
            <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
              <div className="max-w-2xl">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-accent mb-4">
                  {String(sectionIndex + 1).padStart(2, '0')} Category Focus
                </p>
                <h2 className="text-3xl sm:text-5xl font-black text-dark tracking-tight leading-none">
                  {section.categoryName}
                </h2>
                <p className="mt-4 text-gray-500 font-medium text-base sm:text-lg leading-relaxed">
                  The latest published stories from the {section.categoryName.toLowerCase()} desk, shown category-wise right below the hero section.
                </p>
              </div>
              <Link
                href={`/category/${section.categorySlug}`}
                className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary hover:text-accent transition-all"
              >
                View {section.categoryName}
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {section.posts.length > 0 ? (
                section.posts.map((post, postIndex) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.45, delay: postIndex * 0.06 }}
                  >
                    <NewsCard
                      id={post.id}
                      slug={post.slug}
                      title={post.title}
                      image={post.image}
                      category={post.category}
                      excerpt={post.excerpt}
                      date={post.date}
                      views={post.views}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="md:col-span-2 xl:col-span-4 rounded-[32px] border border-dashed border-gray-200 bg-gray-50/70 p-10 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">
                    New Category Added
                  </p>
                  <h3 className="mt-4 text-2xl font-black text-dark tracking-tight">
                    {section.categoryName} is ready for stories
                  </h3>
                  <p className="mt-4 max-w-2xl mx-auto text-sm font-medium leading-relaxed text-gray-500">
                    This category is now visible on the homepage. Publish a story in {section.categoryName.toLowerCase()} and it will automatically appear here.
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
                    <Link
                      href="/admin/posts/new"
                      className="rounded-full bg-primary px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-dark"
                    >
                      Create Story
                    </Link>
                    <Link
                      href={`/category/${section.categorySlug}`}
                      className="rounded-full border border-gray-200 bg-white px-6 py-3 text-[10px] font-black uppercase tracking-widest text-dark transition-all hover:border-primary hover:text-primary"
                    >
                      Open Category
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="py-20 px-8">
        <div className="max-w-[1440px] mx-auto bg-dark rounded-[40px] sm:rounded-[64px] p-8 sm:p-20 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <img src={safeTrendingNews[0]?.image || safeFeaturedNews[0]?.image || safeLatestNews[0]?.image || '/WhatsApp_Image_2026-04-01_at_11.33.21_AM-removebg-preview.png'} alt="Magazine banner" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="px-6 py-2 bg-accent text-white text-xs font-black uppercase tracking-widest rounded-full mb-8 shadow-2xl">Database Powered</span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-10">Bhoomi Premium Digital Magazine</h2>
            <p className="text-white/60 text-lg sm:text-xl font-medium leading-relaxed mb-12">Every published story now has a backend path, a stored category, and a reusable content record powering the whole site.</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button className="px-10 py-5 bg-white text-dark font-black uppercase tracking-wider rounded-full hover:bg-primary hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95">Read Edition</button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black uppercase tracking-wider rounded-full hover:bg-white hover:text-dark transition-all hover:scale-105 active:scale-95">View Archive</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
