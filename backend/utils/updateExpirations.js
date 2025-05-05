import Product from "../models/Product.js"
import Notification from "../models/Notification.js";

const createNewNotification = async (type, message, productId, batchId) => {
    await Notification.create({
      type,
      message,
      productId,
      batchId,
    });
};

export const updateExpiredStatus = async () => {
  console.log("****updateExpiredStatus***")
  const products = await Product.find();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const product of products) {
    let expiredQty = 0;
    let expiringSoonQty = 0;
    let upcomingExpirations = [];
    let expiredExpirations = [];

    for (const batch of product.batches || []) {
      if (!batch.expirationDate) {
        batch.isExpired = false;
        batch.isExpiringSoon = false;
        continue; // Skip this batch
      }
      const expDate = new Date(batch.expirationDate);
      // expDate.setHours(0, 0, 0, 0);

      if (expDate <= today) {
        console.log("product : ", product.productName, "expired")
        batch.isExpired = true;
        batch.isExpiringSoon = false;
        expiredQty += batch.qty;
        expiredExpirations.push(expDate.getTime());
        if (!batch.notifiedExpired) {
          await createNewNotification(
            "expired",
            `${product.productName} - (${batch.qty} items expired, date: ${expDate.toDateString()})`,
            product._id,
            batch._id 
          );
          batch.notifiedExpired = true;
        }
      } else {
        const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);
        if (diffDays <= 7) {
          batch.isExpired = false;
          batch.isExpiringSoon = true;
          expiringSoonQty += batch.qty;
          console.log("product: ", product.productName, "expring soon")
          if (!batch.notifiedExpiringSoon) {
            await createNewNotification(
              "expiring soon",
              `${product.productName} - (${batch.qty} items expiring soon, date: ${expDate.toDateString()})`,
              product._id,
              batch._id
            );
            batch.notifiedExpiringSoon = true;
          }
        } else {
          // console.log("product: ", product.productName, "not expring soon")
          batch.isExpired = false;
          batch.isExpiringSoon = false;
        }
        upcomingExpirations.push(expDate.getTime());
      }
    }

    let earliestExpiration = null;
    if (upcomingExpirations.length > 0) {
      earliestExpiration = new Date(Math.min(...upcomingExpirations));
    } else if (expiredExpirations.length > 0) {
      earliestExpiration = new Date(Math.max(...expiredExpirations));
    }

    product.expiredQty = expiredQty;
    product.expiringSoonQty = expiringSoonQty;
    product.earliestExpiration = earliestExpiration;

    await product.save();
  }
  console.log("****updateExpiredStatusEnd***")
};

// module.exports = updateExpiredStatus;