import 'dotenv/config';
import { db } from './schema';
import { sql } from 'drizzle-orm';

async function migrate() {
  console.log('🚀 Running database migrations...');
  
  try {
    // Create ideas table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS ideas (
        id VARCHAR(50) PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        upvotes INTEGER DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create index on created_at for sorting
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS ideas_created_at_idx ON ideas (created_at DESC);
    `);

    console.log('✅ Database migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  migrate().then(() => process.exit(0));
}

export { migrate };