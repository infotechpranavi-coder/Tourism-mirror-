"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Send,
  Image as ImageIcon,
  X,
  Plus,
  Tag as TagIcon,
  ChevronRight,
  Eye,
  Settings,
  Upload,
  Calendar,
  User,
} from 'lucide-react';
import Editor from '@/components/admin/Editor';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import type { ContentPost } from '@/lib/content';

const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  slug: z.string().min(3, 'Slug is required'),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(2, 'Author name is required'),
  content: z.string().min(10, 'Content is required'),
  status: z.enum(['draft', 'published']),
  image: z.string().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostEditorFormProps {
  mode: 'create' | 'edit';
  initialPost?: ContentPost | null;
}

export default function PostEditorForm({ mode, initialPost }: PostEditorFormProps) {
  const [content, setContent] = useState(initialPost?.content || '');
  const [imageItems, setImageItems] = useState<
    Array<
      | { id: string; kind: 'url'; value: string; preview: string }
      | { id: string; kind: 'file'; file: File; preview: string }
    >
  >(
    (initialPost?.images?.length ? initialPost.images : initialPost?.image ? [initialPost.image] : []).map((image, index) => ({
      id: `existing-${index}`,
      kind: 'url' as const,
      value: image,
      preview: image,
    }))
  );
  const [galleryUrls, setGalleryUrls] = useState('');
  const [tags, setTags] = useState<string[]>(initialPost?.tags || ['Tech', 'Future', 'Quantum']);
  const [newTag, setNewTag] = useState('');
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState<null | {
    title: string;
    message: string;
    slug: string;
  }>(null);
  const router = useRouter();

  const isEditMode = mode === 'edit';
  const imagePreviews = imageItems.map((item) => item.preview);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialPost?.title || '',
      slug: initialPost?.slug || '',
      category: initialPost?.categorySlug || '',
      author: initialPost?.author || 'Aitik Official',
      status: initialPost?.status || 'draft',
      content: initialPost?.content || '',
      image: initialPost?.image || '',
    },
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/categories', { cache: 'no-store' });
        const data = await response.json();

        if (response.ok && Array.isArray(data.categories)) {
          const databaseCategories = data.categories
            .map((category: { id: string; name: string; slug: string }) => ({
              id: category.id,
              name: category.name,
              slug: category.slug,
            }))
            .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));

          setCategories(databaseCategories);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    setValue('content', content, { shouldValidate: true });
  }, [content, setValue]);

  const onSubmit = async (data: PostFormValues) => {
    setIsSubmitting(true);

    try {
      const mergedImages = Array.from(
        new Set(galleryUrls.split('\n').map((item) => item.trim()).filter(Boolean))
      );

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('slug', data.slug);
      formData.append('category', data.category);
      formData.append('author', data.author);
      formData.append('content', content);
      formData.append('status', data.status);
      formData.append('tags', JSON.stringify(tags));

      const imageOrder: Array<{ kind: 'url'; value: string } | { kind: 'file'; key: string }> = [];
      let fileIndex = 0;

      imageItems.forEach((item) => {
        if (item.kind === 'url') {
          imageOrder.push({ kind: 'url', value: item.value });
          return;
        }

        const key = `image-file-${fileIndex++}`;
        formData.append(key, item.file);
        imageOrder.push({ kind: 'file', key });
      });

      mergedImages.forEach((url) => {
        imageOrder.push({ kind: 'url', value: url });
      });

      formData.append('imageOrder', JSON.stringify(imageOrder));

      const response = await fetch(
        isEditMode && initialPost?.id ? `/api/posts/${initialPost.id}` : '/api/posts',
        {
          method: 'POST',
          body: formData,
        }
      );

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Failed to save story');
      }

      const isPublished = data.status === 'published';
      setSuccessModal({
        title: isEditMode
          ? isPublished ? 'Story Updated Successfully' : 'Draft Updated Successfully'
          : isPublished ? 'Story Published Successfully' : 'Draft Saved Successfully',
        message: isEditMode
          ? 'Your changes have been stored in the database successfully.'
          : isPublished
            ? 'Your story has been stored in the database and is now ready across the site.'
            : 'Your draft has been stored in the database and can be published anytime.',
        slug: payload.post?.slug || data.slug,
      });
      toast.success(
        isEditMode
          ? 'Post updated successfully!'
          : isPublished
            ? 'News story published successfully!'
            : 'Draft saved successfully!'
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save story';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      return;
    }

    Promise.all(
      files.map(
        (file) =>
          Promise.resolve({
            id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
            kind: 'file' as const,
            file,
            preview: URL.createObjectURL(file),
          })
      )
    ).then((items) => {
      setImageItems((current) => {
        const nextImages = [...current, ...items];
        const firstImage = nextImages[0];
        setValue(
          'image',
          firstImage?.kind === 'url' ? firstImage.value : firstImage?.preview || '',
          { shouldValidate: true }
        );
        return nextImages;
      });
    });
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const closeSuccessModal = () => {
    setSuccessModal(null);
    router.push('/admin/posts');
    router.refresh();
  };

  const resetFormForCreate = () => {
    setSuccessModal(null);
    setContent('');
    imageItems.forEach((item) => {
      if (item.kind === 'file') {
        URL.revokeObjectURL(item.preview);
      }
    });
    setImageItems([]);
    setGalleryUrls('');
    setTags(['Tech', 'Future', 'Quantum']);
    setNewTag('');
    reset({
      title: '',
      slug: '',
      category: '',
      author: 'Aitik Official',
      content: '',
      status: 'draft',
      image: '',
    });
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-24">
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[36px] bg-white p-8 sm:p-10 shadow-2xl">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">Success</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-dark">{successModal.title}</h2>
              </div>
              <button
                type="button"
                onClick={closeSuccessModal}
                className="rounded-2xl bg-gray-50 p-3 text-gray-400 transition-all hover:bg-gray-100 hover:text-primary"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-6 text-sm font-medium leading-relaxed text-gray-500">{successModal.message}</p>
            <div className="mt-6 rounded-2xl bg-gray-50 px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Stored slug</p>
              <p className="mt-2 break-all text-sm font-bold text-dark">/news/{successModal.slug}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={closeSuccessModal}
                className="flex-1 rounded-2xl bg-primary px-6 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:bg-dark"
              >
                Go To Posts
              </button>
              {!isEditMode && (
                <button
                  type="button"
                  onClick={resetFormForCreate}
                  className="flex-1 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-xs font-black uppercase tracking-widest text-dark transition-all hover:border-primary hover:text-primary"
                >
                  Create Another
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link href="/admin/posts" className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 rounded-2xl shadow-sm transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
              <span>Manage News</span> <ChevronRight size={12} /> <span className="text-gray-900">{isEditMode ? 'Edit Story' : 'New Story'}</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none">
              {isEditMode ? 'Edit Story' : 'Draft a New Story'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit({ ...data, status: 'draft' }))}
            disabled={isSubmitting}
            className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm text-sm"
          >
            <Save size={18} className="text-gray-400" />
            {isEditMode ? 'Update Draft' : 'Save Draft'}
          </button>
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit({ ...data, status: 'published' }))}
            disabled={isSubmitting}
            className="px-8 py-3 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all flex items-center gap-2 shadow-xl shadow-primary/20 scale-100 active:scale-95 text-sm"
          >
            <Send size={18} />
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Now'}
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Post Headline</label>
              <input
                {...register('title')}
                placeholder="Enter a compelling headline..."
                className="w-full text-3xl font-black text-gray-900 placeholder:text-gray-200 outline-none border-b-2 border-gray-50 focus:border-primary/20 bg-transparent py-4 transition-all"
              />
              {errors.title && <p className="text-xs text-red-500 font-bold">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">URL Slug</label>
                <div className="relative group">
                  <input
                    {...register('slug')}
                    placeholder="e.g. quantum-computing-2026"
                    className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 rounded-[20px] outline-none transition-all text-sm font-bold"
                  />
                  <Settings className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary" size={16} />
                </div>
                {errors.slug && <p className="text-xs text-red-500 font-bold">{errors.slug.message}</p>}
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Assigned Category</label>
                <select
                  {...register('category')}
                  className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 rounded-[20px] outline-none transition-all text-sm font-bold appearance-none"
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-500 font-bold">{errors.category.message}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Full Story Content</label>
            <Editor value={content} onChange={setContent} />
            {errors.content && <p className="text-xs text-red-500 font-bold ml-4">{errors.content.message}</p>}
          </div>
        </div>

        <div className="xl:col-span-4 space-y-10">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
              <ImageIcon size={18} className="text-accent" /> Post Images
            </h3>

            <label className="cursor-pointer flex flex-col items-center gap-4 text-gray-400 hover:text-primary transition-all p-8 text-center rounded-3xl bg-gray-50 border-2 border-dashed border-gray-100 hover:border-primary/40">
              <Upload size={32} className="group-hover:scale-110 transition-transform" />
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-wider">Upload Multiple Images</p>
                <p className="text-[10px] font-bold">The first image becomes the cover image.</p>
              </div>
              <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
            </label>

            {imageItems.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {imageItems.map((item, index) => (
                  <div key={item.id} className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                    <img src={item.preview} className="h-full w-full object-cover" alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => {
                        if (item.kind === 'file') {
                          URL.revokeObjectURL(item.preview);
                        }

                        setImageItems((current) => {
                          const next = current.filter((currentItem) => currentItem.id !== item.id);
                          const firstImage = next[0];
                          setValue(
                            'image',
                            firstImage?.kind === 'url' ? firstImage.value : firstImage?.preview || '',
                            { shouldValidate: true }
                          );
                          return next;
                        });
                      }}
                      className="absolute right-3 top-3 rounded-xl bg-white/90 p-2 text-red-600 shadow-lg transition-all hover:bg-white"
                    >
                      <X size={14} />
                    </button>
                    {index === 0 && (
                      <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <input
              {...register('image')}
              type="url"
              placeholder="Or paste a cover image URL"
              className="w-full px-5 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl outline-none transition-all text-xs font-bold"
              onChange={(e) => {
                setValue('image', e.target.value, { shouldValidate: true });
                setImageItems((current) => {
                  const rest = current.filter((_, index) => index !== 0);

                  if (!e.target.value) {
                    return rest;
                  }

                  return [
                    {
                      id: 'cover-url',
                      kind: 'url',
                      value: e.target.value,
                      preview: e.target.value,
                    },
                    ...rest,
                  ];
                });
              }}
            />
            <textarea
              value={galleryUrls}
              onChange={(e) => setGalleryUrls(e.target.value)}
              placeholder="Optional gallery image URLs, one per line"
              className="min-h-28 w-full rounded-xl bg-gray-50 px-5 py-3 text-xs font-bold outline-none transition-all focus:bg-white focus:border-primary/20"
            />
            <p className="text-[10px] text-gray-400 font-medium px-2 leading-relaxed">The first image is used on cards, the homepage, and the story hero. All uploaded images will also appear inside the post page as a gallery.</p>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
              <TagIcon size={18} className="text-primary" /> Story Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-blue-50 text-primary text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 border border-blue-100 shadow-sm group">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-blue-300 hover:text-red-500 transition-colors"><X size={12} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add new tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-5 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl outline-none transition-all text-xs font-bold"
              />
              <button
                type="button"
                onClick={addTag}
                className="p-3 bg-primary text-white rounded-xl hover:bg-dark transition-all shadow-lg active:scale-95"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Publish Details</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-gray-400 uppercase tracking-widest flex items-center gap-2"><User size={16} /> Author</span>
                <span className="text-dark">{initialPost?.author || 'Aitik Official'}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-gray-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={16} /> Schedule</span>
                <span className="text-accent">Publish Immediately</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-gray-400 uppercase tracking-widest flex items-center gap-2"><Eye size={16} /> Visibility</span>
                <span className="text-green-600">Public</span>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-100">
              <button type="button" className="w-full py-4 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-2">
                <Settings size={14} /> Advanced SEO Rules
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
