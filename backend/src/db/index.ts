import { db, ideas, type Idea, type NewIdea, type CreateIdeaData, type UpdateIdeaData } from './schema';
import { sql } from 'drizzle-orm';

export { db, ideas, type Idea, type NewIdea, type CreateIdeaData, type UpdateIdeaData };

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    await db.execute(sql`SELECT 1`);
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown
export async function closeConnection(): Promise<void> {
  try {
    console.log('🔌 Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}