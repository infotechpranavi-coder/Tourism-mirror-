import HomePageClient from '@/components/home/HomePageClient';
import { getCustomCategories, getPublishedPosts, type ContentPost } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getCustomCategories()]);
  const validPosts = posts.filter((post) => post?.slug && post?.title && post?.image);
  const featuredNews = validPosts.slice(0, 2);
  const trendingNews = validPosts.slice(2, 5);
  const latestNews = validPosts.slice(0, 6);
  const postsByCategory = validPosts.reduce((map, post) => {
    const existingPosts = map.get(post.categorySlug) || [];
    map.set(post.categorySlug, [...existingPosts, post]);
    return map;
  }, new Map<string, ContentPost[]>());
  const categorySections = categories.map((category) => ({
    categorySlug: category.slug,
    categoryName: category.name,
    posts: (postsByCategory.get(category.slug) || []).slice(0, 4),
  }));

  return (
    <HomePageClient
      featuredNews={featuredNews.length ? featuredNews : validPosts.slice(0, 1)}
      trendingNews={trendingNews.length ? trendingNews : validPosts.slice(0, 3)}
      latestNews={latestNews}
      categorySections={categorySections}
    />
  );
}
