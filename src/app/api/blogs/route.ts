import { NextResponse } from 'next/server';
import { connectToDatabase, isDbConnected } from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { memoryStore } from '@/lib/memoryStore';
import { initialBlogsData } from '@/lib/initialData';

export async function GET() {
  try {
    await connectToDatabase();

    if (isDbConnected()) {
      let blogs = await Blog.find();
      if (blogs.length === 0) {
        await Blog.insertMany(initialBlogsData);
        blogs = await Blog.find();
      }
      return NextResponse.json({ data: blogs, source: 'mongodb_atlas' });
    }
  } catch (e) {
    console.warn('MongoDB connect failed in blogs route, using memoryStore', e);
  }

  if (!memoryStore.blogs || !Array.isArray(memoryStore.blogs) || memoryStore.blogs.length === 0) {
    memoryStore.blogs = JSON.parse(JSON.stringify(initialBlogsData));
  }

  return NextResponse.json({ data: memoryStore.blogs, source: 'memory_store' });
}

export async function POST(req: Request) {
  const body = await req.json();
  const id = body.id || 'blog-' + Date.now();
  const newPost = { ...body, id };

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      const created = await Blog.create(newPost);
      return NextResponse.json({ success: true, data: created });
    }
  } catch (e) {
    console.warn('MongoDB POST failed, fallback to memory', e);
  }

  if (!Array.isArray(memoryStore.blogs)) memoryStore.blogs = [];
  memoryStore.blogs.unshift(newPost);
  return NextResponse.json({ success: true, data: newPost });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      const updated = await Blog.findOneAndUpdate({ id }, updates, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
  } catch (e) {
    console.warn('MongoDB PUT failed, fallback to memory', e);
  }

  if (!Array.isArray(memoryStore.blogs)) {
    memoryStore.blogs = JSON.parse(JSON.stringify(initialBlogsData));
  }
  const idx = memoryStore.blogs.findIndex((b) => b.id === id);
  if (idx !== -1) {
    memoryStore.blogs[idx] = { ...memoryStore.blogs[idx], ...updates };
  }
  return NextResponse.json({ success: true, data: memoryStore.blogs[idx] });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      await Blog.deleteOne({ id });
      return NextResponse.json({ success: true, id });
    }
  } catch (e) {
    console.warn('MongoDB DELETE failed, fallback to memory', e);
  }

  if (Array.isArray(memoryStore.blogs)) {
    memoryStore.blogs = memoryStore.blogs.filter((b) => b.id !== id);
  }
  return NextResponse.json({ success: true, id });
}
