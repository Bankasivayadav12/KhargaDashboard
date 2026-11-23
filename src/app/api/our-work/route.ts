import { NextResponse } from 'next/server';
import { connectToDatabase, isDbConnected } from '@/lib/mongodb';
import { OurWork } from '@/models/OurWork';
import { memoryStore } from '@/lib/memoryStore';
import { initialOurWorkData } from '@/lib/initialData';

export async function GET() {
  await connectToDatabase();

  if (isDbConnected()) {
    let items = await OurWork.find().sort({ order: 1 });
    if (items.length === 0) {
      await OurWork.insertMany(initialOurWorkData);
      items = await OurWork.find().sort({ order: 1 });
    }
    return NextResponse.json({ data: items, source: 'mongodb_atlas' });
  }

  memoryStore.ourWork.sort((a, b) => a.order - b.order);
  return NextResponse.json({ data: memoryStore.ourWork, source: 'memory_store' });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;
  await connectToDatabase();

  if (isDbConnected()) {
    const item = await OurWork.findOneAndUpdate({ id }, updates, { new: true });
    return NextResponse.json({ success: true, data: item });
  }

  const idx = memoryStore.ourWork.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryStore.ourWork[idx] = { ...memoryStore.ourWork[idx], ...updates };
  }
  return NextResponse.json({ success: true, data: memoryStore.ourWork[idx] });
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectToDatabase();

  if (isDbConnected()) {
    const item = await OurWork.create(body);
    return NextResponse.json({ success: true, data: item });
  }

  memoryStore.ourWork.push(body);
  return NextResponse.json({ success: true, data: body });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await connectToDatabase();

  if (isDbConnected()) {
    await OurWork.findOneAndDelete({ id });
    return NextResponse.json({ success: true });
  }

  memoryStore.ourWork = memoryStore.ourWork.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
