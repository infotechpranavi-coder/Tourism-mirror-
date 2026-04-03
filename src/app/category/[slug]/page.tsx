import Header from '@/components/layout/Header';
import NewsCard from '@/components/NewsCard';
import { getPublishedPostsByCategory } from '@/lib/content';
import { ChevronRight, Eye, Filter, Grid, List, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const posts = await getPublishedPostsByCategory(slug);
  const categoryName = posts[0]?.category || slug.charAt(0).toUpperCase() + slug.slice(1);
  const leadStory = posts[0];
  const briefingStories = posts.slice(1, 4);
  const storyLedger = posts.slice(4);
  const categoryStats = [
    { label: 'Live Briefings', value: String(briefingStories.length).padStart(2, '0') },
    { label: 'Published Stories', value: String(posts.length).padStart(2, '0') },
    { label: 'Weekly Reach', value: `${Math.max(12, Math.round(posts.reduce((sum, post) => sum + post.views, 0) / 1000))}K` },
  ];

  if (!leadStory) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fff_0%,#fbfbfd_32%,#fff_100%)] pb-24">
        <Header />
        <section className="pt-[180px] px-4 sm:px-8 max-w-[900px] mx-auto text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-accent">Category Desk</p>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.06em] text-dark">{categoryName}</h1>
          <p className="mt-6 text-lg font-medium text-gray-500 leading-relaxed">No published stories are in this category yet. Publish a story from the admin panel and it will appear here automatically.</p>
          <Link href="/admin/posts/new" className="mt-10 inline-flex rounded-full bg-primary px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:bg-dark">
            Publish A Story
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff_0%,#fbfbfd_32%,#fff_100%)] pb-24">
      <Header />

      <section className="pt-[140px] px-4 sm:px-8 max-w-[1440px] mx-auto">
        <nav className="flex items-center gap-3 text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-400 mb-10 py-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-dark font-black tracking-widest">{categoryName}</span>
        </nav>

        <div className="relative overflow-hidden rounded-[44px] border border-gray-100 bg-white px-6 py-8 shadow-[0_20px_80px_rgba(16,24,40,0.06)] sm:px-10 sm:py-12">
          <div className="absolute -right-24 top-0 h-56 w-56 rounded-full bg-primary/8 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl"></div>
          <div className="relative z-10 grid gap-10 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
            <div className="max-w-4xl">
              <span className="mb-6 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-accent">
                Trending in {categoryName}
              </span>
              <h1 className="text-5xl font-black leading-none tracking-[-0.06em] text-dark sm:text-7xl xl:text-8xl">
                {categoryName}
                <span className="block text-primary/25">Desk</span>
              </h1>
              <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-gray-500 sm:text-xl">
                Published stories from MongoDB are grouped here automatically, giving this desk a live editorial feed instead of hardcoded cards.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {categoryStats.map((stat) => (
                  <div key={stat.label} className="rounded-[24px] border border-gray-100 bg-gray-50/80 px-4 py-5 text-center backdrop-blur-sm">
                    <p className="text-xl font-black tracking-tight text-dark sm:text-2xl">{stat.value}</p>
                    <p className="mt-2 text-[9px] font-black uppercase tracking-[0.24em] text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/news/${leadStory.slug}`} className="flex-1 rounded-2xl border border-transparent bg-dark px-8 py-4 text-center text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-primary">
                  Explore {categoryName}
                </Link>
                <button className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-gray-400 transition-all hover:border-gray-200 hover:bg-white hover:text-primary">
                  <Filter size={18} />
                </button>
                <div className="flex rounded-2xl border border-gray-100 bg-gray-50 p-1.5">
                  <button className="rounded-xl bg-white p-2.5 text-primary shadow-sm"><Grid size={18} /></button>
                  <button className="p-2.5 text-gray-300 transition-colors hover:text-gray-500"><List size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-8 max-w-[1440px] mx-auto mt-12 mb-24">
        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
          <NewsCard
            id={leadStory.id}
            slug={leadStory.slug}
            title={leadStory.title}
            image={leadStory.image}
            category={leadStory.category}
            excerpt={leadStory.excerpt}
            date={leadStory.date}
            views={leadStory.views}
            featured
          />

          <aside className="rounded-[36px] border border-gray-100 bg-dark p-8 text-white shadow-2xl shadow-dark/10 transition-transform duration-300 hover:-translate-y-1">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-accent">
              Editor&apos;s Note
            </span>
            <h3 className="mt-6 text-3xl font-black leading-tight tracking-tight">
              The pulse of {categoryName.toLowerCase()} is now backed by live content data.
            </h3>
            <p className="mt-5 text-sm font-medium leading-relaxed text-white/60">
              Publish a story once and it flows into the homepage, category desk, and article view automatically. This section is no longer manually curated in code.
            </p>
            <div className="mt-10 space-y-4">
              {['Fresh from the CMS', 'Database-backed desk', 'Live publishing flow'].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <span className="text-sm font-black uppercase tracking-[0.18em] text-white/80">{item}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">0{index + 1}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 sm:px-8 max-w-[1440px] mx-auto">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">Today&apos;s Ledger</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-dark sm:text-4xl">{categoryName} signals, briefs, and major moves</h2>
          </div>
          <p className="hidden max-w-md text-right text-sm font-medium leading-relaxed text-gray-400 lg:block">
            A live desk view with a lead narrative, rapid briefings, and a cleaner two-column stream for deeper reading.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.8fr] gap-8 sm:gap-10 mb-12">
          <article className="group overflow-hidden rounded-[40px] border border-gray-100 bg-white shadow-sm transition-all hover:shadow-2xl">
            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[320px] md:min-h-[100%] overflow-hidden">
                <img src={leadStory.image} alt={leadStory.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/10 to-transparent md:bg-gradient-to-r md:from-transparent md:to-dark/10"></div>
                <span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-primary shadow-lg">
                  Lead Story
                </span>
              </div>
              <div className="flex flex-col justify-between p-8 sm:p-10">
                <div>
                  <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>{leadStory.date}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    <span className="flex items-center gap-1.5"><Eye size={12} className="text-accent" /> {new Intl.NumberFormat('en-US').format(leadStory.views)}</span>
                  </div>
                  <Link href={`/news/${leadStory.slug}`}>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tighter leading-[1.02] text-dark transition-colors group-hover:text-primary">
                      {leadStory.title}
                    </h2>
                  </Link>
                  <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-gray-500">
                    {leadStory.excerpt}
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">Inside {categoryName}</span>
                  <Link href={`/news/${leadStory.slug}`} className="text-xs font-black uppercase tracking-widest text-primary transition-all group-hover:translate-x-1">
                    Read Feature
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <div className="space-y-5">
            {briefingStories.map((story) => (
              <article key={story.id} className="group flex gap-4 rounded-[28px] border border-gray-100 bg-gray-50 p-4 shadow-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-[22px]">
                  <img src={story.image} alt={story.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.24em] text-accent">Briefing</span>
                    <Link href={`/news/${story.slug}`}>
                      <h3 className="mt-3 line-clamp-3 text-lg font-black leading-tight tracking-tight text-dark transition-colors group-hover:text-primary">
                        {story.title}
                      </h3>
                    </Link>
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>{story.date}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    <span>{new Intl.NumberFormat('en-US').format(story.views)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {storyLedger.map((story) => (
            <article key={story.id} className="group overflow-hidden rounded-[34px] border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className="grid sm:grid-cols-[220px_1fr]">
                <div className="relative h-64 overflow-hidden sm:h-full">
                  <img src={story.image} alt={story.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/35 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-dark/10"></div>
                </div>
                <div className="flex flex-col p-7 sm:p-8">
                  <div className="mb-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span className="rounded-full bg-primary/5 px-3 py-1 text-primary">{categoryName}</span>
                    <span>{story.date}</span>
                  </div>
                  <Link href={`/news/${story.slug}`}>
                    <h3 className="text-2xl font-black leading-tight tracking-tight text-dark transition-colors group-hover:text-primary">
                      {story.title}
                    </h3>
                  </Link>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-gray-500">
                    {story.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-8">
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <Eye size={12} className="text-accent" /> {new Intl.NumberFormat('en-US').format(story.views)}
                    </span>
                    <Link href={`/news/${story.slug}`} className="text-xs font-black uppercase tracking-widest text-primary transition-all group-hover:translate-x-1">
                      Read Story
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 flex items-center justify-center">
          <Link href="/admin/posts/new" className="px-12 py-5 bg-white text-dark border-2 border-dark/10 font-black uppercase tracking-widest text-sm rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all shadow-xl active:scale-95">
            Publish More Stories
          </Link>
        </div>
      </section>

      <section className="mt-32 overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#f4f6fb_100%)] py-24 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center shadow-lg"><TrendingUp size={24} /></div>
            <div>
              <h2 className="text-3xl font-black text-dark tracking-tighter">Must-Read in {categoryName}</h2>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Highlighted by the editorial board</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {posts.slice(0, 4).map((story) => (
              <Link key={story.id} href={`/news/${story.slug}`} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group">
                <div className="h-48 sm:h-64 rounded-2xl overflow-hidden mb-6">
                  <img src={story.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={story.title} />
                </div>
                <h3 className="text-xl font-black text-dark leading-snug group-hover:text-primary transition-colors mb-4 line-clamp-2">
                  {story.title}
                </h3>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{story.date}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">Explore <ChevronRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
