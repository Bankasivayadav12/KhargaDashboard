import { NextResponse } from 'next/server';
import { connectToDatabase, isDbConnected } from '@/lib/mongodb';
import { Hero } from '@/models/Hero';
import { Service } from '@/models/Service';
import { WhyChoose } from '@/models/WhyChoose';
import { OurWork } from '@/models/OurWork';
import { Blog } from '@/models/Blog';
import { Career } from '@/models/Career';
import { memoryStore } from '@/lib/memoryStore';
import {
  initialHeroData,
  initialServicesData,
  initialWhyChooseData,
  initialOurWorkData,
  initialBlogsData,
  initialCareersData,
} from '@/lib/initialData';

export async function POST() {
  await connectToDatabase();

  if (isDbConnected()) {
    try {
      await Hero.deleteMany({});
      await Hero.create(initialHeroData);

      await Service.deleteMany({});
      await Service.insertMany(initialServicesData);

      await WhyChoose.deleteMany({});
      await WhyChoose.insertMany(initialWhyChooseData);

      await OurWork.deleteMany({});
      await OurWork.insertMany(initialOurWorkData);

      await Blog.deleteMany({});
      await Blog.insertMany(initialBlogsData);

      await Career.deleteMany({});
      await Career.insertMany(initialCareersData);

      return NextResponse.json({
        success: true,
        message: 'Successfully seeded MongoDB Atlas with official Kharga website data including Blogs and Careers!',
        target: 'mongodb_atlas',
      });
    } catch (err: any) {
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
  }

  // Memory fallback reset
  memoryStore.hero = { ...initialHeroData };
  memoryStore.services = JSON.parse(JSON.stringify(initialServicesData));
  memoryStore.whyChoose = JSON.parse(JSON.stringify(initialWhyChooseData));
  memoryStore.ourWork = JSON.parse(JSON.stringify(initialOurWorkData));
  memoryStore.blogs = JSON.parse(JSON.stringify(initialBlogsData));
  memoryStore.careers = JSON.parse(JSON.stringify(initialCareersData));

  return NextResponse.json({
    success: true,
    message: 'Reset fallback in-memory store with website defaults including Blogs and Careers',
    target: 'memory_store',
  });
}
