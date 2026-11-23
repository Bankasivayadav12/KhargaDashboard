import { NextResponse } from 'next/server';
import { connectToDatabase, isDbConnected } from '@/lib/mongodb';
import { TeamMember } from '@/models/Team';
import { memoryStore } from '@/lib/memoryStore';
import { initialTeamData } from '@/lib/initialData';

export async function GET() {
  try {
    await connectToDatabase();
    if (isDbConnected()) {
      let team = await TeamMember.find().sort({ order: 1 });
      if (team.length === 0) {
        await TeamMember.insertMany(initialTeamData);
        team = await TeamMember.find().sort({ order: 1 });
      }
      return NextResponse.json({ data: team, source: 'mongodb_atlas' });
    }
  } catch (e) {
    console.warn('MongoDB team fetch failed, using memoryStore', e);
  }

  if (!memoryStore.team || !Array.isArray(memoryStore.team) || memoryStore.team.length === 0) {
    memoryStore.team = JSON.parse(JSON.stringify(initialTeamData));
  }
  return NextResponse.json({ data: memoryStore.team, source: 'memory_store' });
}

export async function POST(req: Request) {
  const body = await req.json();
  const id = body.id || 'team-' + Date.now();
  const newMember = { ...body, id };

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      const created = await TeamMember.create(newMember);
      return NextResponse.json({ success: true, data: created });
    }
  } catch (e) {
    console.warn('MongoDB POST team failed, fallback to memory', e);
  }

  if (!Array.isArray(memoryStore.team)) memoryStore.team = [];
  memoryStore.team.push(newMember);
  return NextResponse.json({ success: true, data: newMember });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      const updated = await TeamMember.findOneAndUpdate({ id }, updates, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
  } catch (e) {
    console.warn('MongoDB PUT team failed, fallback to memory', e);
  }

  if (!Array.isArray(memoryStore.team)) {
    memoryStore.team = JSON.parse(JSON.stringify(initialTeamData));
  }
  const idx = memoryStore.team.findIndex((m) => m.id === id);
  if (idx !== -1) {
    memoryStore.team[idx] = { ...memoryStore.team[idx], ...updates };
  }
  return NextResponse.json({ success: true, data: memoryStore.team[idx] });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      await TeamMember.deleteOne({ id });
      return NextResponse.json({ success: true, id });
    }
  } catch (e) {
    console.warn('MongoDB DELETE team failed, fallback to memory', e);
  }

  if (Array.isArray(memoryStore.team)) {
    memoryStore.team = memoryStore.team.filter((m) => m.id !== id);
  }
  return NextResponse.json({ success: true, id });
}
