import PostEditorForm from '@/components/admin/PostEditorForm';
import { getPostByIdentifier } from '@/lib/content';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostByIdentifier(id);

  if (!post) {
    notFound();
  }

  return <PostEditorForm mode="edit" initialPost={post} />;
}
