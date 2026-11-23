import { NextResponse } from 'next/server';
import { connectToDatabase, isDbConnected } from '@/lib/mongodb';
import { Career } from '@/models/Career';
import { memoryStore } from '@/lib/memoryStore';
import { initialCareersData } from '@/lib/initialData';

export async function GET() {
  try {
    await connectToDatabase();

    if (isDbConnected()) {
      let careers = await Career.find();
      if (careers.length === 0) {
        await Career.insertMany(initialCareersData);
        careers = await Career.find();
      }
      return NextResponse.json({ data: careers, source: 'mongodb_atlas' });
    }
  } catch (e) {
    console.warn('MongoDB connect failed in careers route, using memoryStore', e);
  }

  if (!memoryStore.careers || !Array.isArray(memoryStore.careers) || memoryStore.careers.length === 0) {
    memoryStore.careers = JSON.parse(JSON.stringify(initialCareersData));
  }

  return NextResponse.json({ data: memoryStore.careers, source: 'memory_store' });
}

export async function POST(req: Request) {
  const body = await req.json();
  const id = body.id || 'career-' + Date.now();
  const newJob = { ...body, id };

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      const created = await Career.create(newJob);
      return NextResponse.json({ success: true, data: created });
    }
  } catch (e) {
    console.warn('MongoDB POST failed, fallback to memory', e);
  }

  if (!Array.isArray(memoryStore.careers)) memoryStore.careers = [];
  memoryStore.careers.unshift(newJob);
  return NextResponse.json({ success: true, data: newJob });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      const updated = await Career.findOneAndUpdate({ id }, updates, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
  } catch (e) {
    console.warn('MongoDB PUT failed, fallback to memory', e);
  }

  if (!Array.isArray(memoryStore.careers)) {
    memoryStore.careers = JSON.parse(JSON.stringify(initialCareersData));
  }
  const idx = memoryStore.careers.findIndex((c) => c.id === id);
  if (idx !== -1) {
    memoryStore.careers[idx] = { ...memoryStore.careers[idx], ...updates };
  }
  return NextResponse.json({ success: true, data: memoryStore.careers[idx] });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      await Career.deleteOne({ id });
      return NextResponse.json({ success: true, id });
    }
  } catch (e) {
    console.warn('MongoDB DELETE failed, fallback to memory', e);
  }

  if (Array.isArray(memoryStore.careers)) {
    memoryStore.careers = memoryStore.careers.filter((c) => c.id !== id);
  }
  return NextResponse.json({ success: true, id });
}
