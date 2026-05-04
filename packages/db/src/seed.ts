import { db, users } from './index';
import bcrypt from 'bcrypt';

async function seed() {
  console.log('Seeding initial admin user...');
  
  const email = 'saloniambatkar18@gmail.com';
  const password = 'Saloni@18';
  const name = 'Saloni Ambatkar';
  
  const passwordHash = await bcrypt.hash(password, 10);
  
  try {
    await db.insert(users).values({
      name,
      email,
      passwordHash,
      role: 'admin',
    }).onConflictDoNothing();
    
    console.log('Seed successful: Admin user created.');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    process.exit(0);
  }
}

seed();
