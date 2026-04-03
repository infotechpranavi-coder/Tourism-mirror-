import Header from '@/components/layout/Header';
import NewsCard from '@/components/NewsCard';
import PostHeroCarousel from '@/components/news/PostHeroCarousel';
import { getPostByIdentifier, getPublishedPosts, incrementPostViews } from '@/lib/content';
import { Eye, Facebook, Twitter, Instagram, Bookmark, MessageSquare, ChevronRight, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface NewsDetailProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetail({ params }: NewsDetailProps) {
  const { id } = await params;
  const post = await getPostByIdentifier(id);

  if (!post) {
    notFound();
  }

  await incrementPostViews(id);

  const relatedNews = (await getPublishedPosts(6))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const moreStories = (await getPublishedPosts(10))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="bg-white pb-24">
      <Header />

      <section className="pt-[110px] w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <nav className="flex items-center gap-3 text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-400 mb-10 py-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="text-gray-300" />
            <Link href={`/category/${post.categorySlug}`} className="hover:text-primary transition-colors">{post.category}</Link>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-dark/40 font-bold truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="relative rounded-[36px] sm:rounded-[52px] overflow-hidden h-[320px] sm:h-[420px] xl:h-[520px] shadow-2xl shadow-primary/10 border border-gray-100">
            <PostHeroCarousel title={post.title} images={post.images.length > 0 ? post.images : [post.image]} />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/82 via-dark/28 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 p-8 sm:p-16 w-full max-w-5xl">
              <div className="flex flex-wrap items-center gap-6 mb-8 text-white/60 text-xs sm:text-sm font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><Calendar size={18} className="text-accent" /> {post.date}</span>
                <span className="flex items-center gap-2"><Eye size={18} className="text-white/40" /> {post.views.toLocaleString('en-US')} Reads</span>
                <span className="flex items-center gap-2"><MessageSquare size={18} className="text-white/40" /> Live Story</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-10">
                {post.title}
              </h1>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white font-black uppercase">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-black uppercase tracking-widest text-[13px]">{post.author}</p>
                  <p className="text-white/50 font-bold text-[10px] uppercase tracking-wider">{post.category} Correspondent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          <div className="lg:col-span-8">
            <article className="news-content text-lg sm:text-xl font-medium text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }}></article>

            {post.images.length > 1 && (
              <div className="mt-16">
                <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">Story Gallery</p>
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-dark">More Images From This Post</h2>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                    {post.images.length} visuals
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {post.images.map((image, index) => (
                    <div key={`${image}-${index}`} className="overflow-hidden rounded-[32px] border border-gray-100 bg-gray-50 shadow-sm">
                      <img
                        src={image}
                        alt={`${post.title} image ${index + 1}`}
                        className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-10">
              <div className="flex flex-wrap gap-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Share this:</span>
                <div className="flex gap-4">
                  <button className="p-3 bg-gray-50 hover:bg-[#1877F2] hover:text-white transition-all rounded-xl text-gray-400 shadow-sm"><Facebook size={18} /></button>
                  <button className="p-3 bg-gray-50 hover:bg-[#1DA1F2] hover:text-white transition-all rounded-xl text-gray-400 shadow-sm"><Twitter size={18} /></button>
                  <button className="p-3 bg-gray-50 hover:bg-[#E1306C] hover:text-white transition-all rounded-xl text-gray-400 shadow-sm"><Instagram size={18} /></button>
                  <button className="p-3 bg-primary text-white hover:bg-dark transition-all rounded-xl shadow-xl shadow-primary/20"><Bookmark size={18} /></button>
                </div>
              </div>
            </div>

            <div className="mt-20 p-10 bg-gray-50 rounded-[40px] flex flex-col sm:flex-row items-center gap-10">
              <div className="w-32 h-32 rounded-3xl overflow-hidden shrink-0 border-4 border-white shadow-xl bg-white flex items-center justify-center text-4xl font-black text-primary">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-2xl font-black text-dark mb-3">About {post.author}</h4>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">This story was published through the admin CMS and rendered from MongoDB, so author, category, tags, and rich article content all come from the same backend record.</p>
                <Link href={`/category/${post.categorySlug}`} className="text-xs font-black uppercase tracking-widest text-primary hover:text-accent transition-all flex items-center gap-2">
                  More In {post.category} <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-16">
            <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
              <h3 className="text-2xl font-black text-dark mb-8 tracking-tighter uppercase tracking-widest text-xs">Recommended for you</h3>
              <div className="space-y-8">
                {relatedNews.map((news) => (
                  <Link key={news.id} href={`/news/${news.slug}`} className="flex gap-5 group cursor-pointer">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[9px] font-black text-accent uppercase tracking-widest leading-none mb-2">{news.category}</span>
                      <h4 className="text-sm font-bold text-dark leading-tight group-hover:text-primary transition-colors line-clamp-2">{news.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-2 font-medium">{news.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href={`/category/${post.categorySlug}`} className="block w-full mt-10 py-4 bg-gray-50 hover:bg-primary hover:text-white text-center text-gray-400 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all">
                Show More Stories
              </Link>
            </div>

            <div className="bg-primary rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                <Mail size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4 leading-tight">Join the Bhoomi Inner Circle</h3>
              <p className="text-white/60 text-sm font-medium mb-8">Receive early access to digital magazines and premium deep dives.</p>
              <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl outline-none focus:bg-white focus:text-dark text-white placeholder:text-white/40 font-bold transition-all text-sm mb-4" />
              <button className="w-full py-4 bg-accent text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white hover:text-accent transition-all shadow-xl active:scale-95">Subscribe Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 mt-32">
        <h2 className="text-3xl sm:text-5xl font-black text-dark tracking-tighter mb-16">Explore More Stories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {moreStories.map((story) => (
            <NewsCard
              key={story.id}
              id={story.id}
              slug={story.slug}
              title={story.title}
              image={story.image}
              category={story.category}
              excerpt={story.excerpt}
              date={story.date}
              views={story.views}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
