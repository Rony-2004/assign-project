import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { pgTable, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core';

const connectionString = process.env['DATABASE_URL']!;
// Enable SSL for Neon/Postgres over TLS
const client = postgres(connectionString, { ssl: 'require' });
export const db = drizzle(client);

// Schema
export const ideas = pgTable('ideas', {
  id: varchar('id', { length: 50 }).primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  upvotes: integer('upvotes').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Idea = typeof ideas.$inferSelect;
export type NewIdea = typeof ideas.$inferInsert;

// Additional types for API operations
export interface CreateIdeaData {
  title: string;
  description: string;
}

export interface UpdateIdeaData {
  title?: string;
  description?: string;
  upvotes?: number;
}