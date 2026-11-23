import { NextResponse } from 'next/server';
import { connectToDatabase, isDbConnected, connectToMongoDB } from '@/lib/mongodb';
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
  initialClientsData,
} from '@/lib/initialData';

export async function GET() {
  try {
    const connResult = await connectToDatabase();
    const dbConnected = isDbConnected();

    if (dbConnected) {
      try {
        const heroCount = await Hero.countDocuments();
        const servicesCount = await Service.countDocuments();
        const whyChooseCount = await WhyChoose.countDocuments();
        const ourWorkCount = await OurWork.countDocuments();
        const blogsCount = await Blog.countDocuments();
        const careersCount = await Career.countDocuments();

        let clientsCount = 6;
        try {
          const client = await connectToMongoDB();
          clientsCount = await client.db('kharga').collection('clientsdata').countDocuments();
        } catch {}

        return NextResponse.json({
          status: 'connected',
          mode: 'mongodb_atlas',
          uriConfigured: Boolean(process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<username>')),
          counts: {
            hero: heroCount,
            services: servicesCount,
            whyChoose: whyChooseCount,
            ourWork: ourWorkCount,
            clients: clientsCount,
            blogs: blogsCount,
            careers: careersCount,
          },
        });
      } catch (e: any) {
        return NextResponse.json({
          status: 'error',
          mode: 'memory_fallback',
          message: e.message,
          counts: {
            hero: 1,
            services: memoryStore?.services?.length || initialServicesData.length,
            whyChoose: memoryStore?.whyChoose?.length || initialWhyChooseData.length,
            ourWork: memoryStore?.ourWork?.length || initialOurWorkData.length,
            clients: memoryStore?.clients?.length || initialClientsData.length,
            blogs: memoryStore?.blogs?.length || initialBlogsData.length,
            careers: memoryStore?.careers?.length || initialCareersData.length,
          },
        });
      }
    }

    return NextResponse.json({
      status: 'awaiting_atlas_uri',
      mode: 'memory_fallback',
      uriConfigured: Boolean(process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<username>')),
      error: connResult.error,
      counts: {
        hero: 1,
        services: memoryStore?.services?.length || initialServicesData.length,
        whyChoose: memoryStore?.whyChoose?.length || initialWhyChooseData.length,
        ourWork: memoryStore?.ourWork?.length || initialOurWorkData.length,
        clients: memoryStore?.clients?.length || initialClientsData.length,
        blogs: memoryStore?.blogs?.length || initialBlogsData.length,
        careers: memoryStore?.careers?.length || initialCareersData.length,
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'memory_fallback',
      mode: 'memory_fallback',
      uriConfigured: false,
      error: err.message,
      counts: {
        hero: 1,
        services: initialServicesData.length,
        whyChoose: initialWhyChooseData.length,
        ourWork: initialOurWorkData.length,
        clients: initialClientsData.length,
        blogs: initialBlogsData.length,
        careers: initialCareersData.length,
      },
    });
  }
}
