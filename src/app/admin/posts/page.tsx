import PostsManager from '@/components/admin/PostsManager';
import { getAdminPosts } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const posts = await getAdminPosts();

  return <PostsManager posts={posts} />;
}
