import "dotenv/config";
import { db } from "@/lib/auth.lib.js";
import { CREATE_USER } from "@/constants/index.constant.js";
import logger from "@/lib/logger.lib.js";

async function createUserSeeder() {
  const user = db.collection("user");

  const createUsers = await user.insertMany(CREATE_USER);

  logger.info(`Inserted ${createUsers.insertedCount} users into the database.`);

  return createUsers;
}
createUserSeeder()
  .then(() => {
    logger.info("User seeder executed successfully.");
  })
  .catch((error) => {
    logger.error("Error executing user seeder:", error);
  });
