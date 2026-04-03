import React from 'react';
import { 
  FileText, 
  Users, 
  Eye, 
  TrendingUp,
  Clock,
  ExternalLink,
  ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import { getDashboardSummary } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const summary = await getDashboardSummary();
  const stats = [
    { label: 'Total News Posts', value: String(summary.totalPosts), icon: FileText, change: '', trend: 'up', color: 'bg-blue-500' },
    { label: 'Website Visitors', value: summary.totalViews.toLocaleString('en-US'), icon: Eye, change: '', trend: 'up', color: 'bg-green-500' },
    { label: 'Categories', value: String(summary.categoriesCount), icon: Users, change: '', trend: 'up', color: 'bg-purple-500' },
    { label: 'Active Drafts', value: String(summary.draftPosts), icon: Clock, change: '', trend: 'neutral', color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, Aitik. Here is what's happening with your news today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            target="_blank" 
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 text-sm shadow-sm hover:shadow-md"
          >
            <ExternalLink size={16} />
            View Site
          </Link>
          <Link 
            href="/admin/posts/new" 
            className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center shadow-lg shadow-primary/20 text-sm"
          >
            Create New Post
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group overflow-hidden">
              <div className="flex items-start justify-between relative z-10">
                <div className={stat.color + " w-12 h-12 rounded-xl flex items-center justify-center text-white ring-8 ring-gray-50 transition-all group-hover:scale-110"}>
                  <Icon size={24} />
                </div>
                {stat.change && (
                  <span className="flex items-center gap-1 text-xs font-bold text-green-600 px-2 py-1 bg-green-50 rounded-full border border-green-100">
                    <TrendingUp size={12} />
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="mt-6 relative z-10">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Posts Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 leading-none">Recent News Posts</h2>
            <Link href="/admin/posts" className="text-primary hover:underline text-sm font-bold">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 font-black">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Views</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {summary.recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 group transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="font-bold text-gray-800 text-sm truncate max-w-[200px]">{post.title}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-600 text-xs">{post.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-[10px] rounded-full uppercase tracking-tighter font-black ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{post.status}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">{post.views.toLocaleString('en-US')}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 font-medium">{post.date}</td>
                    <td className="px-6 py-4">
                      <Link href={`/news/${post.slug}`} className="text-gray-400 hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Categories */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all group">
                <FileText size={20} className="group-hover:scale-110 transition-all font-bold" />
                <span className="text-xs font-black uppercase tracking-widest">Add News</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-all group">
                <Users size={20} className="group-hover:scale-110 transition-all font-bold" />
                <span className="text-xs font-black uppercase tracking-widest">Subscribers</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-all group">
                <ImageIcon size={20} className="group-hover:scale-110 transition-all font-bold" />
                <span className="text-xs font-black uppercase tracking-widest">New Media</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all group">
                <TrendingUp size={20} className="group-hover:scale-110 transition-all font-bold" />
                <span className="text-xs font-black uppercase tracking-widest">View SEO</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
