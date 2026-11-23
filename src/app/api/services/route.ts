import { NextResponse } from 'next/server';
import { connectToDatabase, isDbConnected } from '@/lib/mongodb';
import { Service } from '@/models/Service';
import { memoryStore } from '@/lib/memoryStore';
import { initialServicesData } from '@/lib/initialData';

export async function GET() {
  await connectToDatabase();

  if (isDbConnected()) {
    let services = await Service.find().sort({ order: 1 });
    if (services.length === 0) {
      await Service.insertMany(initialServicesData);
      services = await Service.find().sort({ order: 1 });
    }
    return NextResponse.json({ data: services, source: 'mongodb_atlas' });
  }

  memoryStore.services.sort((a, b) => a.order - b.order);
  return NextResponse.json({ data: memoryStore.services, source: 'memory_store' });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  await connectToDatabase();

  if (isDbConnected()) {
    const service = await Service.findOneAndUpdate({ id }, updates, { new: true });
    return NextResponse.json({ success: true, data: service });
  }

  const idx = memoryStore.services.findIndex((s) => s.id === id);
  if (idx !== -1) {
    memoryStore.services[idx] = { ...memoryStore.services[idx], ...updates };
  }
  return NextResponse.json({ success: true, data: memoryStore.services[idx] });
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectToDatabase();

  if (isDbConnected()) {
    const service = await Service.create(body);
    return NextResponse.json({ success: true, data: service });
  }

  memoryStore.services.push(body);
  return NextResponse.json({ success: true, data: body });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  await connectToDatabase();

  if (isDbConnected()) {
    await Service.findOneAndDelete({ id });
    return NextResponse.json({ success: true });
  }

  memoryStore.services = memoryStore.services.filter((s) => s.id !== id);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request) {
  // Reorder items
  const { items } = await req.json(); // array of { id, order }
  await connectToDatabase();

  if (isDbConnected()) {
    for (const item of items) {
      await Service.findOneAndUpdate({ id: item.id }, { order: item.order });
    }
    const updated = await Service.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: updated });
  }

  for (const item of items) {
    const match = memoryStore.services.find((s) => s.id === item.id);
    if (match) match.order = item.order;
  }
  memoryStore.services.sort((a, b) => a.order - b.order);
  return NextResponse.json({ success: true, data: memoryStore.services });
}
