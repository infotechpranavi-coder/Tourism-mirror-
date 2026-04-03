import { NextResponse } from 'next/server';
import { createCategory, deleteCategory, getCategories, updateCategory } from '@/lib/content';

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name) {
    return NextResponse.json({ message: 'Category name is required.' }, { status: 400 });
  }

  const category = await createCategory({
    name: body.name,
    slug: body.slug,
  });

  return NextResponse.json({ category }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();

  if (!body.id || !body.name) {
    return NextResponse.json({ message: 'Category id and name are required.' }, { status: 400 });
  }

  try {
    const category = await updateCategory({
      id: body.id,
      name: body.name,
      slug: body.slug,
    });

    return NextResponse.json({ category });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update category.';
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json({ message: 'Category id is required.' }, { status: 400 });
  }

  try {
    await deleteCategory({ id: body.id });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete category.';
    return NextResponse.json({ message }, { status: 400 });
  }
}
