import { NextResponse } from 'next/server';
import { connectToDatabase, isDbConnected } from '@/lib/mongodb';
import { WhyChoose } from '@/models/WhyChoose';
import { memoryStore } from '@/lib/memoryStore';
import { initialWhyChooseData } from '@/lib/initialData';

export async function GET() {
  await connectToDatabase();

  if (isDbConnected()) {
    let items = await WhyChoose.find().sort({ order: 1 });
    if (items.length === 0) {
      await WhyChoose.insertMany(initialWhyChooseData);
      items = await WhyChoose.find().sort({ order: 1 });
    }
    return NextResponse.json({ data: items, source: 'mongodb_atlas' });
  }

  memoryStore.whyChoose.sort((a, b) => a.order - b.order);
  return NextResponse.json({ data: memoryStore.whyChoose, source: 'memory_store' });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;
  await connectToDatabase();

  if (isDbConnected()) {
    const item = await WhyChoose.findOneAndUpdate({ id }, updates, { new: true });
    return NextResponse.json({ success: true, data: item });
  }

  const idx = memoryStore.whyChoose.findIndex((w) => w.id === id);
  if (idx !== -1) {
    memoryStore.whyChoose[idx] = { ...memoryStore.whyChoose[idx], ...updates };
  }
  return NextResponse.json({ success: true, data: memoryStore.whyChoose[idx] });
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectToDatabase();

  if (isDbConnected()) {
    const item = await WhyChoose.create(body);
    return NextResponse.json({ success: true, data: item });
  }

  memoryStore.whyChoose.push(body);
  return NextResponse.json({ success: true, data: body });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await connectToDatabase();

  if (isDbConnected()) {
    await WhyChoose.findOneAndDelete({ id });
    return NextResponse.json({ success: true });
  }

  memoryStore.whyChoose = memoryStore.whyChoose.filter((w) => w.id !== id);
  return NextResponse.json({ success: true });
}
