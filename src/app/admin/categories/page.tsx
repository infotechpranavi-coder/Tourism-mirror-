"use client";

import React, { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ChevronRight,
  Tags,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  count: number;
  trends: string;
};

const initialCategories: CategoryRow[] = [
  { id: '1', name: 'Technology', slug: 'technology', count: 42, trends: '+12%' },
  { id: '2', name: 'Business', slug: 'business', count: 28, trends: '+8%' },
  { id: '3', name: 'Environment', slug: 'environment', count: 15, trends: '+5%' },
  { id: '4', name: 'Sports', slug: 'sports', count: 34, trends: '+22%' },
  { id: '5', name: 'Health', slug: 'health', count: 19, trends: '+15%' },
  { id: '6', name: 'Culture', slug: 'culture', count: 22, trends: '+10%' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryRow[]>(initialCategories);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ name: '', slug: '' });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();

        if (response.ok && Array.isArray(data.categories)) {
          setCategories(
            data.categories.map((category: any) => ({
              id: category.id,
              name: category.name,
              slug: category.slug,
              count: category.count ?? 0,
              trends: category.count ? `+${Math.min(category.count * 2, 24)}%` : '0%',
            }))
          );
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) => {
        const query = search.trim().toLowerCase();
        if (!query) {
          return true;
        }

        return (
          category.name.toLowerCase().includes(query) ||
          category.slug.toLowerCase().includes(query)
        );
      }),
    [categories, search]
  );

  const openCreateForm = () => {
    setEditingCategoryId(null);
    setFormValues({ name: '', slug: '' });
    setIsFormOpen((current) => !current || editingCategoryId !== null);
  };

  const openEditForm = (category: CategoryRow) => {
    setEditingCategoryId(category.id);
    setFormValues({ name: category.name, slug: category.slug });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCategoryId(null);
    setFormValues({ name: '', slug: '' });
  };

  const upsertCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.name.trim() || !formValues.slug.trim()) {
      toast.error('Category name and slug are required.', { position: 'top-center' });
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('/api/categories', {
        method: editingCategoryId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingCategoryId,
          name: formValues.name,
          slug: formValues.slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save category.');
      }

      const nextCategory: CategoryRow = {
        id: data.category.id,
        name: data.category.name,
        slug: data.category.slug,
        count: data.category.count ?? 0,
        trends: data.category.count ? `+${Math.min(data.category.count * 2, 24)}%` : '0%',
      };

      setCategories((current) => {
        if (editingCategoryId) {
          return current.map((category) =>
            category.id === editingCategoryId ? nextCategory : category
          );
        }

        return [...current, nextCategory];
      });

      toast.success(
        editingCategoryId ? 'Category updated successfully.' : 'Category created successfully.',
        { position: 'top-center' }
      );
      closeForm();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to save category.',
        { position: 'top-center' }
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (category: CategoryRow) => {
    const confirmed = window.confirm(`Delete "${category.name}" category?`);

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: category.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete category.');
      }

      setCategories((current) => current.filter((item) => item.id !== category.id));
      toast.success('Category deleted successfully.', { position: 'top-center' });

      if (editingCategoryId === category.id) {
        closeForm();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete category.',
        { position: 'top-center' }
      );
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-3">Content Categories</h1>
          <p className="text-gray-500 font-medium text-sm">Organize your stories into logical buckets to help readers explore.</p>
        </div>
        <button
          onClick={openCreateForm}
          className="px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all flex items-center gap-2 shadow-xl shadow-primary/20 scale-100 active:scale-95 text-xs uppercase tracking-widest"
        >
          {isFormOpen && !editingCategoryId ? 'Cancel' : <><Plus size={18} /> New Category</>}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 gap-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-dark flex items-center gap-2"><Tags size={18} className="text-primary" /> Active Taxonomies</h3>
              <div className="relative group w-full max-w-[240px]">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none text-[11px] font-black uppercase tracking-widest focus:border-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="p-4 sm:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredCategories.map((cat) => (
                  <div key={cat.id} className="group p-8 bg-white border border-gray-100 rounded-[32px] hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center shadow-lg border border-blue-100 group-hover:scale-110 transition-transform">
                        <FileText size={20} />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditForm(cat)}
                          className="p-3 text-gray-300 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                          title="Edit category"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat)}
                          className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete category"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-black text-dark group-hover:text-primary transition-colors">{cat.name}</h4>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                        Slug: <span className="text-accent">/{cat.slug}</span>
                      </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xl font-black text-dark leading-none mb-1">{cat.count}</p>
                          <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Total Posts</p>
                        </div>
                        <div className="w-px h-6 bg-gray-100"></div>
                        <div>
                          <p className={cn('text-sm font-black leading-none mb-1', cat.count > 0 ? 'text-green-600' : 'text-gray-400')}>
                            {cat.trends}
                          </p>
                          <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Monthly</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-200 group-hover:text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-10">
          {isFormOpen && (
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl border-primary/20 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl font-black text-dark tracking-tighter italic">
                {editingCategoryId ? 'Edit Taxonomy' : 'Create Taxonomy'}
              </h3>
              <form onSubmit={upsertCategory} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category Name</label>
                  <input
                    value={formValues.name}
                    onChange={(e) => setFormValues((current) => ({ ...current, name: e.target.value }))}
                    type="text"
                    placeholder="e.g. Science & Tech"
                    className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 rounded-2xl outline-none transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Slug Identifier</label>
                  <input
                    value={formValues.slug}
                    onChange={(e) => setFormValues((current) => ({ ...current, slug: e.target.value }))}
                    type="text"
                    placeholder="e.g. science-tech"
                    className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 rounded-2xl outline-none transition-all text-sm font-bold"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-5 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-primary/10 hover:bg-dark transition-all scale-100 active:scale-95 disabled:opacity-60"
                  >
                    {isSaving ? 'Saving...' : editingCategoryId ? 'Update Category' : 'Add Category'}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-6 py-5 bg-gray-50 text-gray-500 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-100 transition-all"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-dark rounded-[40px] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl scale-150"></div>
            <div className="relative z-10 space-y-6">
              <TrendingUp size={32} className="text-accent mb-4" />
              <h3 className="text-2xl font-black tracking-tighter italic">Growth Insights</h3>
              <p className="text-white/40 text-sm font-medium leading-relaxed">Create, edit, and remove empty categories from one place. Categories with active posts are protected from accidental deletion.</p>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-accent flex items-center gap-2 group-hover:gap-4 transition-all">
                Manage Structure <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
