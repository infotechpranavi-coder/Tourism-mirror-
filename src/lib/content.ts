import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import News from '@/models/News';
import { createExcerpt, slugify } from '@/lib/slug';

const fallbackImages = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504712598893-24159a89200e?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=2070&auto=format&fit=crop',
];

export const defaultCategorySlugs = [
  'politics',
  'business',
  'technology',
  'sports',
  'entertainment',
  'health',
];

const fallbackCategories = [
  { name: 'Politics', slug: 'politics' },
  { name: 'Business', slug: 'business' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Health', slug: 'health' },
];

const fallbackPosts = [
  {
    id: 'seed-technology-1',
    slug: 'future-of-quantum-computing-and-global-security-infrastructure',
    title: 'The Future of Quantum Computing and Global Security Infrastructure',
    excerpt: 'Quantum supremacy is no longer a distant idea. Security leaders are already planning for the post-quantum internet.',
    content: `
      <p class="mb-6 text-xl sm:text-2xl font-bold leading-relaxed text-gray-900">Quantum supremacy is no longer a dream but a pressing reality for cybersecurity leaders globally.</p>
      <p class="mb-6 leading-relaxed">As quantum research accelerates, governments and enterprises are being forced to rethink encryption, trust, and digital sovereignty.</p>
      <p class="mb-6 leading-relaxed">The transition to post-quantum cryptography will require coordinated upgrades across infrastructure, banking, defense, and consumer platforms.</p>
    `,
    image: fallbackImages[0],
    images: [fallbackImages[0], fallbackImages[8], fallbackImages[4]],
    category: 'Technology',
    categorySlug: 'technology',
    author: 'Sarah Drasner',
    status: 'published',
    date: 'Apr 1, 2026',
    views: 15204,
    tags: ['Quantum', 'Security', 'Infrastructure'],
  },
  {
    id: 'seed-business-1',
    slug: 'global-markets-react-to-new-trade-agreements',
    title: 'Global Markets React to New Trade Agreements',
    excerpt: 'Fresh trade frameworks are shifting investment confidence and redrawing regional growth expectations.',
    content: `
      <p class="mb-6 text-xl sm:text-2xl font-bold leading-relaxed text-gray-900">Trade policy is moving from the margins to the center of market strategy.</p>
      <p class="mb-6 leading-relaxed">Analysts say new bilateral agreements are already changing supply-chain decisions, hiring plans, and currency outlooks.</p>
      <p class="mb-6 leading-relaxed">The most resilient businesses are the ones translating geopolitical changes into operating strategy early.</p>
    `,
    image: fallbackImages[2],
    images: [fallbackImages[2], fallbackImages[1], fallbackImages[6]],
    category: 'Business',
    categorySlug: 'business',
    author: 'Mark Chen',
    status: 'published',
    date: 'Mar 30, 2026',
    views: 11024,
    tags: ['Markets', 'Trade', 'Economy'],
  },
  {
    id: 'seed-sports-1',
    slug: 'champions-league-underdogs-make-a-historic-comeback',
    title: 'Champions League: Underdogs Make a Historic Comeback',
    excerpt: 'A dramatic turnaround has become the defining sports story of the week across Europe.',
    content: `
      <p class="mb-6 text-xl sm:text-2xl font-bold leading-relaxed text-gray-900">The comeback stunned fans and analysts alike.</p>
      <p class="mb-6 leading-relaxed">What looked like a tactical mismatch turned into a case study in resilience, depth, and fearless coaching adjustments.</p>
      <p class="mb-6 leading-relaxed">Momentum has now shifted, and the semifinal conversation looks completely different than it did 48 hours ago.</p>
    `,
    image: fallbackImages[3],
    images: [fallbackImages[3], fallbackImages[5], fallbackImages[9]],
    category: 'Sports',
    categorySlug: 'sports',
    author: 'David Beckham',
    status: 'published',
    date: 'Mar 28, 2026',
    views: 42301,
    tags: ['Sports', 'Football', 'Champions League'],
  },
  {
    id: 'seed-health-1',
    slug: 'mental-health-in-the-age-of-constant-digital-connectivity',
    title: 'Mental Health in the Age of Constant Digital Connectivity',
    excerpt: 'Experts are reassessing what healthy digital behavior looks like in a permanently online world.',
    content: `
      <p class="mb-6 text-xl sm:text-2xl font-bold leading-relaxed text-gray-900">Digital connection has brought convenience, but it has also introduced new patterns of fatigue.</p>
      <p class="mb-6 leading-relaxed">Clinicians are seeing more people question attention, rest, and boundaries in both work and personal life.</p>
      <p class="mb-6 leading-relaxed">The next phase of wellbeing may depend less on abstaining from technology and more on learning to structure it well.</p>
    `,
    image: fallbackImages[7],
    images: [fallbackImages[7], fallbackImages[4], fallbackImages[1]],
    category: 'Health',
    categorySlug: 'health',
    author: 'Dr. Jane Smith',
    status: 'published',
    date: 'Mar 26, 2026',
    views: 6732,
    tags: ['Health', 'Digital Life', 'Wellbeing'],
  },
  {
    id: 'seed-politics-1',
    slug: 'policy-realignment-is-reshaping-election-strategy',
    title: 'Policy Realignment Is Reshaping Election Strategy',
    excerpt: 'Parties are adapting messaging and coalition-building as priorities shift among urban and regional voters.',
    content: `
      <p class="mb-6 text-xl sm:text-2xl font-bold leading-relaxed text-gray-900">Election strategy is becoming more fluid as voter priorities diversify.</p>
      <p class="mb-6 leading-relaxed">Campaign teams are blending local issues with national narratives, creating more segmented outreach models.</p>
      <p class="mb-6 leading-relaxed">The result is a political environment where agility may matter more than broad, static messaging.</p>
    `,
    image: fallbackImages[5],
    images: [fallbackImages[5], fallbackImages[0], fallbackImages[2]],
    category: 'Politics',
    categorySlug: 'politics',
    author: 'Elena Brooks',
    status: 'published',
    date: 'Mar 24, 2026',
    views: 3879,
    tags: ['Politics', 'Elections', 'Policy'],
  },
  {
    id: 'seed-entertainment-1',
    slug: 'streaming-platforms-are-rewriting-the-release-calendar',
    title: 'Streaming Platforms Are Rewriting the Release Calendar',
    excerpt: 'Studios are rethinking launch timing, audience funnels, and franchise pacing across entertainment.',
    content: `
      <p class="mb-6 text-xl sm:text-2xl font-bold leading-relaxed text-gray-900">The entertainment release calendar no longer revolves around a single theatrical logic.</p>
      <p class="mb-6 leading-relaxed">Streaming platforms are sequencing releases to maximize retention, conversation, and cross-promotional lift.</p>
      <p class="mb-6 leading-relaxed">That change is affecting everything from budget allocation to how creative teams structure cliffhangers.</p>
    `,
    image: fallbackImages[9],
    images: [fallbackImages[9], fallbackImages[3], fallbackImages[6]],
    category: 'Entertainment',
    categorySlug: 'entertainment',
    author: 'Nina Carter',
    status: 'published',
    date: 'Mar 21, 2026',
    views: 5210,
    tags: ['Entertainment', 'Streaming', 'Studios'],
  },
];

export interface ContentCategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface ContentPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  author: string;
  status: 'draft' | 'published';
  date: string;
  views: number;
  tags: string[];
}

function formatDate(value?: Date | string) {
  const date = value ? new Date(value) : new Date();

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function normalizeImages(images: Array<string | undefined | null>, fallbackImage?: string) {
  const normalized = Array.from(
    new Set(
      images
        .filter(Boolean)
        .map((image) => String(image).trim())
        .filter(Boolean)
    )
  );

  if (normalized.length > 0) {
    return normalized;
  }

  return fallbackImage ? [fallbackImage] : [];
}

function mapNewsDocument(post: any): ContentPost {
  const category = post.category && typeof post.category === 'object' ? post.category : null;
  const status: ContentPost['status'] = post.status === 'draft' ? 'draft' : 'published';
  const image = post.image || '';
  const images = normalizeImages(Array.isArray(post.images) ? post.images : [], image);

  return {
    id: String(post._id),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || createExcerpt(post.content || ''),
    content: post.content,
    image: image || images[0],
    images,
    category: category?.name || 'General',
    categorySlug: category?.slug || 'general',
    author: post.author || 'Admin',
    status,
    date: formatDate(post.createdAt),
    views: post.views || 0,
    tags: Array.isArray(post.tags) ? post.tags : [],
  };
}

async function connectSafely() {
  try {
    await dbConnect();
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    return false;
  }
}

export async function ensureDefaultCategories() {
  const connected = await connectSafely();

  if (!connected) {
    return fallbackCategories;
  }

  await Promise.all(
    fallbackCategories.map((category) =>
      Category.findOneAndUpdate(
        { slug: category.slug },
        { $setOnInsert: category },
        { new: true, upsert: true }
      )
    )
  );

  const categories = await Category.find().sort({ name: 1 }).lean();

  return categories.map((category: any) => ({
    id: String(category._id),
    name: category.name,
    slug: category.slug,
  }));
}

export async function getCategories() {
  const connected = await connectSafely();

  if (!connected) {
    return fallbackCategories.map((category) => ({
      id: category.slug,
      ...category,
      count: fallbackPosts.filter((post) => post.categorySlug === category.slug).length,
    }));
  }

  await ensureDefaultCategories();

  const categories = await Category.find().sort({ name: 1 }).lean();
  const counts = await News.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);
  const countMap = new Map(counts.map((item: any) => [String(item._id), item.count]));

  return categories.map((category: any) => ({
    id: String(category._id),
    name: category.name,
    slug: category.slug,
    count: countMap.get(String(category._id)) || 0,
  }));
}

export async function getCustomCategories() {
  const categories = await getCategories();

  return categories.filter((category) => !defaultCategorySlugs.includes(category.slug));
}

export async function createCategory(input: { name: string; slug?: string }) {
  const connected = await connectSafely();
  const slug = slugify(input.slug || input.name);
  const name = input.name.trim();

  if (!connected) {
    return { id: slug, name, slug, count: 0 };
  }

  const category = await Category.findOneAndUpdate(
    { slug },
    { name, slug },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return {
    id: String(category._id),
    name: category.name,
    slug: category.slug,
    count: 0,
  };
}

export async function updateCategory(input: { id: string; name: string; slug?: string }) {
  const connected = await connectSafely();
  const slug = slugify(input.slug || input.name);
  const name = input.name.trim();

  if (!connected) {
    return { id: input.id, name, slug, count: 0 };
  }

  const existingCategory = await Category.findById(input.id);

  if (!existingCategory) {
    throw new Error('Category not found.');
  }

  const duplicate = await Category.findOne({
    slug,
    _id: { $ne: input.id },
  }).lean();

  if (duplicate) {
    throw new Error('A category with this slug already exists.');
  }

  existingCategory.name = name;
  existingCategory.slug = slug;
  await existingCategory.save();

  const count = await News.countDocuments({ category: existingCategory._id });

  return {
    id: String(existingCategory._id),
    name: existingCategory.name,
    slug: existingCategory.slug,
    count,
  };
}

export async function deleteCategory(input: { id: string }) {
  const connected = await connectSafely();

  if (!connected) {
    return { deleted: true };
  }

  const category = await Category.findById(input.id);

  if (!category) {
    throw new Error('Category not found.');
  }

  const relatedPostsCount = await News.countDocuments({ category: category._id });

  if (relatedPostsCount > 0) {
    throw new Error('This category cannot be deleted because it still has posts.');
  }

  await Category.findByIdAndDelete(input.id);

  return { deleted: true };
}

export async function getAdminPosts() {
  const connected = await connectSafely();

  if (!connected) {
    return [...fallbackPosts].sort((a, b) => b.date.localeCompare(a.date)) as ContentPost[];
  }

  const posts = await News.find()
    .populate('category')
    .sort({ createdAt: -1 })
    .lean();

  return posts.map(mapNewsDocument);
}

export async function getPublishedPosts(limit?: number) {
  const connected = await connectSafely();
  const fallbackPublishedPosts = fallbackPosts.filter((post) => post.status === 'published') as ContentPost[];

  if (!connected) {
    return typeof limit === 'number' ? fallbackPublishedPosts.slice(0, limit) : fallbackPublishedPosts;
  }

  const query = News.find({ status: 'published' })
    .populate('category')
    .sort({ createdAt: -1 });

  if (typeof limit === 'number') {
    query.limit(limit);
  }

  const posts = await query.lean();
  const mappedPosts = posts.map(mapNewsDocument);

  if (mappedPosts.length === 0) {
    return typeof limit === 'number' ? fallbackPublishedPosts.slice(0, limit) : fallbackPublishedPosts;
  }

  return mappedPosts;
}

export async function getPublishedPostsByCategory(categorySlug: string) {
  const connected = await connectSafely();

  if (!connected) {
    return fallbackPosts.filter(
      (post) => post.status === 'published' && post.categorySlug === categorySlug
    ) as ContentPost[];
  }

  const category = (await Category.findOne({ slug: categorySlug }).lean()) as any;

  if (!category) {
    return [];
  }

  const posts = await News.find({
    category: category._id,
    status: 'published',
  })
    .populate('category')
    .sort({ createdAt: -1 })
    .lean();

  return posts.map(mapNewsDocument);
}

export async function getPostByIdentifier(identifier: string) {
  const connected = await connectSafely();

  if (!connected) {
    return (fallbackPosts.find((post) => post.slug === identifier || post.id === identifier) || null) as ContentPost | null;
  }

  const post = await News.findOne({
    $or: [{ slug: identifier }, { _id: identifier.match(/^[a-f0-9]{24}$/i) ? identifier : null }],
  })
    .populate('category')
    .lean();

  return post ? mapNewsDocument(post) : null;
}

export async function incrementPostViews(identifier: string) {
  const connected = await connectSafely();

  if (!connected) {
    return;
  }

  await News.findOneAndUpdate(
    { $or: [{ slug: identifier }, { _id: identifier.match(/^[a-f0-9]{24}$/i) ? identifier : null }] },
    { $inc: { views: 1 } }
  );
}

export async function savePost(input: {
  id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  image?: string;
  images?: string[];
  category: string;
  author: string;
  status: 'draft' | 'published';
  tags?: string[];
}) {
  const connected = await connectSafely();
  const postSlug = slugify(input.slug || input.title);
  const categorySlug = slugify(input.category);
  const categoryName =
    fallbackCategories.find((category) => category.slug === categorySlug)?.name ||
    input.category
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  const excerpt = input.excerpt?.trim() || createExcerpt(input.content);
  const image =
    input.image?.trim() ||
    fallbackImages[
      Math.abs(
        [...postSlug].reduce((sum, char) => sum + char.charCodeAt(0), 0)
      ) % fallbackImages.length
    ];
  const images = normalizeImages([image, ...(input.images || [])], image);

  if (!connected) {
    return {
      id: postSlug,
      slug: postSlug,
      title: input.title.trim(),
      excerpt,
      content: input.content,
      image,
      images,
      category: categoryName,
      categorySlug,
      author: input.author.trim(),
      status: input.status,
      date: formatDate(),
      views: 0,
      tags: input.tags || [],
    };
  }

  const category = await Category.findOneAndUpdate(
    { slug: categorySlug },
    { name: categoryName, slug: categorySlug },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  const filter = input.id ? { _id: input.id } : { slug: postSlug };

  const post = await News.findOneAndUpdate(
    filter,
    {
      title: input.title.trim(),
      slug: postSlug,
      excerpt,
      content: input.content,
      image,
      images,
      category: category._id,
      author: input.author.trim(),
      status: input.status,
      tags: input.tags || [],
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .populate('category')
    .lean();

  return mapNewsDocument(post);
}

export async function getDashboardSummary() {
  const [posts, categories] = await Promise.all([getAdminPosts(), getCategories()]);

  const publishedPosts = posts.filter((post) => post.status === 'published');
  const draftPosts = posts.filter((post) => post.status === 'draft');
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);

  return {
    totalPosts: posts.length,
    publishedPosts: publishedPosts.length,
    draftPosts: draftPosts.length,
    totalViews,
    categoriesCount: categories.length,
    recentPosts: posts.slice(0, 5),
  };
}
