import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

export const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://khargadigitalmedia007_db_user:6ZV4oZUdwr7htlpo@cluster0.lz5nypb.mongodb.net/kharga?compressors=zlib";

// --- Native MongoClient connection ---
let client: MongoClient;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
  var _mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

if (!global._mongoClient) {
  global._mongoClient = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
}
client = global._mongoClient;

export async function connectToMongoDB(): Promise<MongoClient> {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
    throw err;
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB(): Promise<void> {
  await client.close();
}

export { client };

// --- Mongoose connection for Mongoose models ---
if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}
const cached = global._mongooseCache;

export async function connectToDatabase(): Promise<{ success: boolean; connection?: any; error?: string }> {
  if (cached.conn) {
    return { success: true, connection: cached.conn };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    };
    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return { success: true, connection: cached.conn };
  } catch (e: any) {
    cached.promise = null;
    console.error("Mongoose connection error:", e);
    return { success: false, error: e?.message || 'Database connection error' };
  }
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export default connectToMongoDB;
