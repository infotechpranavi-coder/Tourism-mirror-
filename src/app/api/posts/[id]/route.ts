import { NextResponse } from 'next/server';
import { uploadFileToCloudinary, uploadPostImages } from '@/lib/cloudinary';
import { getPostByIdentifier, savePost } from '@/lib/content';

export const runtime = 'nodejs';

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface ParsedPostPayload {
  title: string;
  slug: string;
  category: string;
  author: string;
  content: string;
  status: string;
  tags: string[];
  orderedImages: string[];
}

async function parsePostForm(request: Request): Promise<ParsedPostPayload> {
  const formData = await request.formData();
  const title = String(formData.get('title') || '');
  const slug = String(formData.get('slug') || '');
  const category = String(formData.get('category') || '');
  const author = String(formData.get('author') || '');
  const content = String(formData.get('content') || '');
  const status = String(formData.get('status') || '');
  const rawTags = String(formData.get('tags') || '[]');
  const rawImageOrder = String(formData.get('imageOrder') || '[]');
  const tags = JSON.parse(rawTags);
  const imageOrder = JSON.parse(rawImageOrder) as Array<
    | { kind: 'url'; value: string }
    | { kind: 'file'; key: string }
  >;

  const orderedImages = await Promise.all(
    imageOrder.map(async (entry) => {
      if (entry.kind === 'url') {
        return entry.value;
      }

      const file = formData.get(entry.key);

      if (!file || typeof file === 'string' || typeof file.arrayBuffer !== 'function') {
        return '';
      }

      return uploadFileToCloudinary(file);
    })
  );

  return {
    title,
    slug,
    category,
    author,
    content,
    status,
    tags: Array.isArray(tags) ? tags : [],
    orderedImages: orderedImages.filter((image): image is string => Boolean(image)),
  };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const post = await getPostByIdentifier(id);

  if (!post) {
    return NextResponse.json({ message: 'Post not found.' }, { status: 404 });
  }

  return NextResponse.json({ post });
}

async function updatePost(request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const { title, slug, category, author, content, status, tags, orderedImages } = await parsePostForm(request);

    if (!title || !content || !category || !author || !status) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const uploaded = await uploadPostImages({
      images: orderedImages,
    });

    const post = await savePost({
      id,
      title,
      slug,
      content,
      image: uploaded.coverImage,
      images: uploaded.images,
      category,
      author,
      status: status as 'draft' | 'published',
      tags: Array.isArray(tags) ? tags : [],
    });

    return NextResponse.json({ post });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Image upload failed.';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  return updatePost(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  return updatePost(request, context);
}
