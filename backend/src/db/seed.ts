import 'dotenv/config';
import { db, ideas } from './schema';
import { randomBytes } from 'crypto';

const sampleIdeas = [
  {
    id: randomBytes(16).toString('hex'),
    title: 'Smart Home Integration',
    description: 'Create a unified app to control all smart home devices from different manufacturers',
    upvotes: 15,
  },
  {
    id: randomBytes(16).toString('hex'),
    title: 'AI-Powered Learning Assistant',
    description: 'Develop an AI tutor that adapts to individual learning styles and provides personalized education',
    upvotes: 23,
  },
  {
    id: randomBytes(16).toString('hex'),
    title: 'Sustainable Shopping Platform',
    description: 'Build a marketplace that only features eco-friendly and sustainable products with carbon footprint tracking',
    upvotes: 8,
  },
  {
    id: randomBytes(16).toString('hex'),
    title: 'Community Garden Network',
    description: 'Connect local communities to share garden spaces, tools, and knowledge for urban farming',
    upvotes: 12,
  },
  {
    id: randomBytes(16).toString('hex'),
    title: 'Mental Health Check-in App',
    description: 'Daily mood tracking with personalized wellness recommendations and professional support connections',
    upvotes: 31,
  },
];

async function seed() {
  console.log('🌱 Seeding database...');
  
  try {
    // Clear existing data
    await db.delete(ideas);
    
    // Insert sample data
    await db.insert(ideas).values(sampleIdeas);
    
    console.log(`✅ Seeded ${sampleIdeas.length} ideas successfully`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seed().then(() => process.exit(0));
}

export { seed };