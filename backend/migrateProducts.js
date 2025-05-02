import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

async function migrateProductData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.uri);
    console.log('✅ Connected to MongoDB');

    // Find all products that have any of the fields to be deleted
    const productsToUpdate = await Product.find({
      $or: [
        { expirationDate: { $exists: true } },
        { isExpired: { $exists: true } },
        { isExpiringSoon: { $exists: true } },
        { lastUpdated: { $exists: true } }
      ]
    });

    console.log(`Found ${productsToUpdate.length} products to update`);

    // Prepare bulk operations
    const bulkOps = productsToUpdate.map((product) => {
      const updateFields = {};
      if ('expirationDate' in product) updateFields.expirationDate = "";
      if ('isExpired' in product) updateFields.isExpired = "";
      if ('isExpiringSoon' in product) updateFields.isExpiringSoon = "";
      if ('lastUpdated' in product) updateFields.lastUpdated = "";

      if (Object.keys(updateFields).length > 0) {
        return {
          updateOne: {
            filter: { _id: product._id },
            update: { $unset: updateFields }
          }
        };
      }
    }).filter(Boolean);

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      console.log(`✅ Deleted old fields from ${result.modifiedCount} products.`);
    } else {
      console.log('No products found with fields to delete.');
    }

    console.log('🎉 Fields deletion complete.');
  } catch (err) {
    console.error('❌ Fields deletion failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

migrateProductData().catch(console.error);
