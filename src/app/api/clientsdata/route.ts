import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';
import { memoryStore } from '@/lib/memoryStore';
import { initialClientsData } from '@/lib/initialData';

const DB_NAME = 'kharga';
const COLLECTION_NAME = 'clientsdata';

// GET: Retrieve all clients or single client by id
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  try {
    const client = await connectToMongoDB();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    if (id) {
      const doc = await collection.findOne({ id });
      if (!doc) {
        return NextResponse.json(
          { success: false, message: `Client with id '${id}' not found in MongoDB` },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        source: 'mongodb_atlas',
        data: {
          ...doc,
          _id: doc._id?.toString(),
        },
      });
    }

    let rawDocs = await collection.find({}).toArray();

    // If empty in MongoDB Atlas, seed with initialClientsData
    if (rawDocs.length === 0) {
      const seedDocs = initialClientsData.map((c) => ({
        ...c,
        createdAt: c.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      await collection.insertMany(seedDocs as any);
      rawDocs = await collection.find({}).toArray();
    }

    const clients = rawDocs.map((doc: any) => ({
      ...doc,
      _id: doc._id?.toString(),
    }));

    return NextResponse.json({
      success: true,
      database: DB_NAME,
      collection: COLLECTION_NAME,
      source: 'mongodb_atlas',
      count: clients.length,
      data: clients,
    });
  } catch (error: any) {
    console.warn('MongoDB GET /api/clientsdata failed, falling back to memory store:', error?.message);

    // Memory Store fallback
    const memoryClients = memoryStore?.clients || initialClientsData;
    if (id) {
      const found = memoryClients.find((c: any) => c.id === id);
      if (!found) {
        return NextResponse.json({ success: false, message: `Client with id '${id}' not found` }, { status: 404 });
      }
      return NextResponse.json({ success: true, source: 'memory_store', data: found });
    }

    return NextResponse.json({
      success: true,
      database: DB_NAME,
      collection: COLLECTION_NAME,
      source: 'memory_store',
      count: memoryClients.length,
      data: memoryClients,
    });
  }
}

// POST: Create or upsert client(s) in clientsdata collection
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Support bulk insertion if body is an array
    if (Array.isArray(body)) {
      try {
        const client = await connectToMongoDB();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const operations = body.map((item: any) => {
          const id = item.id || item.clientName?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `client-${Date.now()}`;
          const doc = {
            ...item,
            id,
            updatedAt: new Date().toISOString(),
            createdAt: item.createdAt || new Date().toISOString(),
          };
          delete doc._id;

          return {
            updateOne: {
              filter: { id },
              update: { $set: doc },
              upsert: true,
            },
          };
        });

        if (operations.length > 0) {
          await collection.bulkWrite(operations);
        }

        const allDocs = await collection.find({}).toArray();
        if (memoryStore) {
          memoryStore.clients = allDocs.map((d: any) => ({ ...d, _id: d._id?.toString() }));
        }

        return NextResponse.json({
          success: true,
          message: `Successfully processed ${operations.length} client record(s) in MongoDB Atlas`,
          source: 'mongodb_atlas',
          count: allDocs.length,
          data: allDocs.map((d: any) => ({ ...d, _id: d._id?.toString() })),
        });
      } catch (err: any) {
        console.warn('MongoDB bulk POST failed, falling back to memoryStore:', err?.message);
        if (memoryStore) {
          memoryStore.clients = body;
        }
        return NextResponse.json({
          success: true,
          message: `Updated in memory fallback`,
          source: 'memory_store',
          count: body.length,
          data: body,
        });
      }
    }

    // Single client document
    const {
      id: rawId,
      clientName,
      clientTagline,
      category,
      metric,
      description,
      image,
      logoSvg,
      logoUrl,
      isPublished = true,
      ...extraFields
    } = body;

    if (!clientName && !rawId) {
      return NextResponse.json(
        { success: false, message: 'clientName or id is required' },
        { status: 400 }
      );
    }

    const id = rawId || clientName?.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') || `client-${Date.now()}`;

    const updateDoc: Record<string, any> = {
      id,
      clientName: clientName || '',
      clientTagline: clientTagline || '',
      category: category || '',
      metric: metric || '',
      description: description || '',
      image: image || '',
      logoSvg: logoSvg || 'crown',
      logoUrl: logoUrl || '',
      isPublished: Boolean(isPublished),
      updatedAt: new Date().toISOString(),
      ...extraFields,
    };
    delete updateDoc._id;

    try {
      const client = await connectToMongoDB();
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);

      await collection.updateOne(
        { id },
        {
          $set: updateDoc,
          $setOnInsert: { createdAt: body.createdAt || new Date().toISOString() },
        },
        { upsert: true }
      );

      const savedDoc = await collection.findOne({ id });

      if (memoryStore?.clients) {
        const idx = memoryStore.clients.findIndex((c: any) => c.id === id);
        if (idx !== -1) {
          memoryStore.clients[idx] = { ...updateDoc, _id: savedDoc?._id?.toString() };
        } else {
          memoryStore.clients.unshift({ ...updateDoc, _id: savedDoc?._id?.toString() });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Client data saved successfully in MongoDB Atlas',
        source: 'mongodb_atlas',
        data: {
          ...savedDoc,
          _id: savedDoc?._id?.toString(),
        },
      });
    } catch (err: any) {
      console.warn('MongoDB POST failed, fallback to memory store:', err?.message);

      if (memoryStore?.clients) {
        const idx = memoryStore.clients.findIndex((c: any) => c.id === id);
        if (idx !== -1) {
          memoryStore.clients[idx] = { ...memoryStore.clients[idx], ...updateDoc };
        } else {
          memoryStore.clients.unshift({ id, ...updateDoc, createdAt: new Date().toISOString() });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Saved to in-memory store (MongoDB Atlas unreachable)',
        source: 'memory_store',
        data: updateDoc,
      });
    }
  } catch (error: any) {
    console.error('POST /api/clientsdata error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to save client data',
        error: error?.message || 'Server error',
      },
      { status: 500 }
    );
  }
}

// PUT: Alias for POST
export async function PUT(request: NextRequest) {
  return POST(request);
}

// DELETE: Delete a client by id
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Client id query param is required' }, { status: 400 });
    }

    try {
      const client = await connectToMongoDB();
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);

      const result = await collection.deleteOne({ id });

      if (memoryStore?.clients) {
        memoryStore.clients = memoryStore.clients.filter((c: any) => c.id !== id);
      }

      if (result.deletedCount === 0) {
        return NextResponse.json({ success: false, message: `Client with id '${id}' not found` }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: `Client '${id}' successfully deleted from MongoDB Atlas`,
        source: 'mongodb_atlas',
      });
    } catch (err: any) {
      console.warn('MongoDB DELETE failed, removing from memory store:', err?.message);
      if (memoryStore?.clients) {
        memoryStore.clients = memoryStore.clients.filter((c: any) => c.id !== id);
      }
      return NextResponse.json({
        success: true,
        message: `Client '${id}' deleted from memory store`,
        source: 'memory_store',
      });
    }
  } catch (error: any) {
    console.error('DELETE /api/clientsdata error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete client', error: error?.message },
      { status: 500 }
    );
  }
}
