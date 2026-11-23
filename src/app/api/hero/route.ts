import { NextResponse } from 'next/server';
import { connectToDatabase, isDbConnected } from '@/lib/mongodb';
import { Hero } from '@/models/Hero';
import { memoryStore } from '@/lib/memoryStore';
import { initialHeroData } from '@/lib/initialData';

export async function GET() {
  await connectToDatabase();
  if (isDbConnected()) {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create(initialHeroData);
    }
    return NextResponse.json({ data: hero, source: 'mongodb_atlas' });
  }
  return NextResponse.json({ data: memoryStore.hero, source: 'memory_store' });
}

export async function PUT(req: Request) {
  const body = await req.json();
  await connectToDatabase();
  if (isDbConnected()) {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({ ...initialHeroData, ...body });
    } else {
      Object.assign(hero, body);
      await hero.save();
    }
    return NextResponse.json({ success: true, data: hero, source: 'mongodb_atlas' });
  }

  memoryStore.hero = { ...memoryStore.hero, ...body, updatedAt: new Date() };
  return NextResponse.json({ success: true, data: memoryStore.hero, source: 'memory_store' });
}


