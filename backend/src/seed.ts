import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean up existing data
  await prisma.donation.deleteMany();
  await prisma.package.deleteMany();
  await prisma.user.deleteMany();
  console.log('🧹 Cleaned up old data.');

  // 2. Create a demo user
  const hashedPassword = await bcrypt.hash('password123', 12);
  const user = await prisma.user.create({
    data: {
      email: 'demo@blokaid.io',
      password: hashedPassword,
      name: 'Demo User',
      walletAddress: 'So11111111111111111111111111111111111111112', // Example wallet
    },
  });
  console.log(`👤 Created user: ${user.email}`);

  // 3. Create a donation record
  const donation = await prisma.donation.create({
    data: {
      txSignature: '5yV8s...demo...signature...4sF9d',
      donorWallet: 'DonorWalletAddressHere...',
      amount: 1.5,
    },
  });
  console.log(`💸 Created donation record with signature: ${donation.txSignature}`);

  // 4. Create a package linked to the donation
  const pkg = await prisma.package.create({
    data: {
      packageId: 101,
      pdaAddress: 'PackagePDAAddressOnChain...',
      contentHash: 'a1b2c3d4e5f6g7h8...',
      status: 'Registered',
      nftMintAddress: 'NFTPubkeyAddressOnChain...',
    },
  });
  console.log(`📦 Created package with ID: ${pkg.packageId}`);

  console.log('✅ Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });