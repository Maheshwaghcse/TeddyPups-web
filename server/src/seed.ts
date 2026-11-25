import { connectDb, disconnectDb } from "./db/connect.js";
import { Puppy } from "./models/Puppy.js";
import { HappyFamily } from "./models/HappyFamily.js";
import { FaqItem } from "./models/FaqItem.js";
import { seedPuppies, seedHappyFamilies, seedFaqs } from "./data/seedData.js";

async function seed(): Promise<void> {
  try {
    await connectDb();

    await Promise.all([
      Puppy.deleteMany({}),
      HappyFamily.deleteMany({}),
      FaqItem.deleteMany({}),
    ]);

    const [puppies, families, faqs] = await Promise.all([
      Puppy.insertMany(seedPuppies),
      HappyFamily.insertMany(seedHappyFamilies),
      FaqItem.insertMany(seedFaqs),
    ]);

    console.log(
      `Seeded successfully: ${puppies.length} puppies, ${families.length} happy families, ${faqs.length} FAQs.`
    );
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exitCode = 1;
  } finally {
    await disconnectDb();
  }
}

seed();

