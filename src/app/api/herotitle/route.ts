import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';
import { memoryStore } from '@/lib/memoryStore';

const DB_NAME = 'kharga';
const COLLECTION_NAME = 'herotitle';

const DEFAULT_HERO_TITLE = {
  title: 'BUILD YOUR BRAND.\nGIANT DIGITAL EXPERIENCES.',
  headline: 'BUILD YOUR BRAND.\nGIANT DIGITAL EXPERIENCES.',
  desc: 'Creative Strategy • Digital Experiences • Business Growth',
  subheadline: 'Creative Strategy • Digital Experiences • Business Growth',
  logo: '/kharga new logo 1.svg',
  videoPoster: '/images/services/service_hero.jpg',
  backgroundVideo: '/images/hero.mp4',
  videoUrl: '/images/hero.mp4',
  ctaText: 'GET STARTED',
  ctaLink: '/contact',
  showLogo: true,
};

// GET: Retrieve hero title configuration from MongoDB Atlas
export async function GET() {
  try {
    const client = await connectToMongoDB();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    let doc: any = await collection.findOne({}, { projection: { _id: 0 } });

    // Seed default if collection is empty
    if (!doc) {
      const initialDoc = {
        ...DEFAULT_HERO_TITLE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await collection.insertOne(initialDoc as any);
      doc = DEFAULT_HERO_TITLE;
    }

    // Ensure convenient field aliases exist for both dashboard and website consumers
    const formattedData = {
      ...doc,
      title: doc.title || doc.headline || DEFAULT_HERO_TITLE.title,
      headline: doc.headline || doc.title || DEFAULT_HERO_TITLE.headline,
      desc: doc.desc || doc.subheadline || DEFAULT_HERO_TITLE.desc,
      subheadline: doc.subheadline || doc.desc || DEFAULT_HERO_TITLE.subheadline,
      backgroundVideo: doc.backgroundVideo || doc.videoUrl || DEFAULT_HERO_TITLE.backgroundVideo,
      videoUrl: doc.videoUrl || doc.backgroundVideo || DEFAULT_HERO_TITLE.videoUrl,
      logo: doc.logo || doc.videoPoster || DEFAULT_HERO_TITLE.logo,
      videoPoster: doc.videoPoster || doc.logo || DEFAULT_HERO_TITLE.videoPoster,
      ctaText: doc.ctaText || DEFAULT_HERO_TITLE.ctaText,
      ctaLink: doc.ctaLink || DEFAULT_HERO_TITLE.ctaLink,
      showLogo: doc.showLogo !== undefined ? doc.showLogo : DEFAULT_HERO_TITLE.showLogo,
    };

    return NextResponse.json({
      success: true,
      database: DB_NAME,
      collection: COLLECTION_NAME,
      source: 'mongodb_atlas',
      data: formattedData,
    });
  } catch (error: any) {
    console.warn('GET /api/herotitle falling back to memory store:', error?.message);

    // Fallback to in-memory store if Atlas connection drops
    const mem = memoryStore?.hero;
    const fallbackData = mem
      ? {
          title: mem.headline || DEFAULT_HERO_TITLE.title,
          headline: mem.headline || DEFAULT_HERO_TITLE.headline,
          desc: mem.subheadline || DEFAULT_HERO_TITLE.desc,
          subheadline: mem.subheadline || DEFAULT_HERO_TITLE.subheadline,
          backgroundVideo: mem.videoUrl || DEFAULT_HERO_TITLE.backgroundVideo,
          videoUrl: mem.videoUrl || DEFAULT_HERO_TITLE.videoUrl,
          logo: mem.videoPoster || DEFAULT_HERO_TITLE.logo,
          videoPoster: mem.videoPoster || DEFAULT_HERO_TITLE.videoPoster,
          ctaText: mem.ctaText || DEFAULT_HERO_TITLE.ctaText,
          ctaLink: mem.ctaLink || DEFAULT_HERO_TITLE.ctaLink,
          showLogo: mem.showLogo !== undefined ? mem.showLogo : DEFAULT_HERO_TITLE.showLogo,
        }
      : DEFAULT_HERO_TITLE;

    return NextResponse.json({
      success: true,
      database: DB_NAME,
      collection: COLLECTION_NAME,
      source: 'memory_fallback',
      data: fallbackData,
    });
  }
}

// POST: Create or update hero title in MongoDB Atlas
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      headline,
      desc,
      subheadline,
      logo,
      videoPoster,
      backgroundVideo,
      videoUrl,
      ctaText,
      ctaLink,
      showLogo,
      ...extraFields
    } = body;

    const updateFields: Record<string, any> = {
      updatedAt: new Date().toISOString(),
      ...extraFields,
    };

    const finalTitle = title !== undefined ? title : headline;
    if (finalTitle !== undefined) {
      updateFields.title = String(finalTitle);
      updateFields.headline = String(finalTitle);
    }

    const finalDesc = desc !== undefined ? desc : subheadline;
    if (finalDesc !== undefined) {
      updateFields.desc = String(finalDesc);
      updateFields.subheadline = String(finalDesc);
    }

    const finalLogo = logo !== undefined ? logo : videoPoster;
    if (finalLogo !== undefined) {
      updateFields.logo = String(finalLogo);
      updateFields.videoPoster = String(finalLogo);
    }

    const finalVideo = backgroundVideo !== undefined ? backgroundVideo : videoUrl;
    if (finalVideo !== undefined) {
      updateFields.backgroundVideo = String(finalVideo);
      updateFields.videoUrl = String(finalVideo);
    }

    if (ctaText !== undefined) updateFields.ctaText = String(ctaText);
    if (ctaLink !== undefined) updateFields.ctaLink = String(ctaLink);
    if (showLogo !== undefined) updateFields.showLogo = Boolean(showLogo);

    try {
      const client = await connectToMongoDB();
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);

      await collection.updateOne(
        {},
        {
          $set: updateFields,
          $setOnInsert: { createdAt: new Date().toISOString() },
        },
        { upsert: true }
      );

      const updatedDoc = await collection.findOne({}, { projection: { _id: 0 } });

      if (memoryStore) {
        memoryStore.hero = { ...memoryStore.hero, ...updateFields };
      }

      return NextResponse.json({
        success: true,
        message: 'Hero title data updated successfully in MongoDB Atlas',
        source: 'mongodb_atlas',
        data: updatedDoc,
      });
    } catch (dbErr: any) {
      console.warn('POST /api/herotitle db error, saving to memory fallback:', dbErr?.message);
      if (memoryStore) {
        memoryStore.hero = { ...memoryStore.hero, ...updateFields };
      }
      return NextResponse.json({
        success: true,
        message: 'Hero title updated in memory fallback',
        source: 'memory_fallback',
        data: updateFields,
      });
    }
  } catch (error: any) {
    console.error('POST /api/herotitle error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update hero title data',
        error: error?.message || 'Server error',
      },
      { status: 500 }
    );
  }
}

// PUT alias for POST
export async function PUT(request: NextRequest) {
  return POST(request);
}
