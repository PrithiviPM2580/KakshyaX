import { db } from "@/lib/auth.lib.js";
import { CREATE_USER } from "@/constants/index.constant.js";
import { logger } from "better-auth";

async function createUserSeeder() {
  const users = db.collection("users");

  const createUsers = await users.insertMany(CREATE_USER);

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
