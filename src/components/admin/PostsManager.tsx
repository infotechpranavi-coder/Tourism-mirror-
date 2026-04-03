"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ContentPost } from '@/lib/content';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PostsManagerProps {
  posts: ContentPost[];
}

export default function PostsManager({ posts }: PostsManagerProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts]
  );

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage News Posts</h1>
          <p className="text-gray-500 mt-1">Every story here is loaded from MongoDB and ready to publish, review, or expand.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20 scale-100 active:scale-95"
        >
          <Plus size={20} />
          Create New Post
        </Link>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative group w-full xl:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search stories by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 rounded-2xl outline-none transition-all text-sm font-semibold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all',
                activeCategory === category ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              )}
            >
              {category}
            </button>
          ))}
          <div className="w-px h-8 bg-gray-100 mx-2 hidden xl:block"></div>
          <button className="p-3 bg-gray-50 text-gray-400 hover:bg-white hover:border-gray-200 border border-transparent rounded-xl transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] sm:text-[11px] uppercase tracking-widest text-gray-400 border-b border-gray-100 font-extrabold">
                <th className="px-8 py-6">Title & Category</th>
                <th className="px-8 py-6">Author</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Views</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-gray-900 truncate max-w-[300px] group-hover:text-primary transition-colors">{post.title}</p>
                        <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{post.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-[10px]">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-gray-600">{post.author}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={cn(
                        'px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 w-fit',
                        post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      )}
                    >
                      {post.status === 'published' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {post.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1.5">
                      <Eye size={12} className="text-gray-300" />
                      <span className="text-sm font-black text-gray-900">{post.views.toLocaleString('en-US')}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-semibold text-gray-400">{post.date}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/news/${post.slug}`} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="View Public Post">
                        <ExternalLink size={18} />
                      </Link>
                      <Link href={`/admin/posts/edit/${post.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit Post">
                        <Edit3 size={18} />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete Post">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Showing 1 to {filteredPosts.length} of {posts.length} entries</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-xl hover:bg-white text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed" disabled>
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 bg-primary text-white rounded-xl font-black text-xs shadow-lg shadow-primary/10">1</button>
            <button className="p-2 border border-gray-200 rounded-xl hover:bg-white text-gray-400">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
