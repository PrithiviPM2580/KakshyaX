import { db } from "@/lib/auth.lib.js";
import { ObjectId } from "mongodb";
import type { GetUserByIdInput } from "@/validator/user.validator.js";

export async function findUsers(
  options: FindAllOptions,
): Promise<Record<string, unknown>[]> {
  const { skip, limit, search, sortBy, order, userId } = options;

  const filter: any = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (userId) {
    filter._id = typeof userId === "string" ? new ObjectId(userId) : userId;
  }

  const sortOrder = order === "asc" ? 1 : -1;

  const users = (await db
    .collection("user")
    .find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .toArray()) as Record<string, unknown>[];

  return users;
}

export async function countUsers(options: {
  search?: string | undefined;
}): Promise<number> {
  const { search } = options;

  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const userCollection = db.collection("user");

  const total = await userCollection.countDocuments(filter);

  return total;
}

export async function findUserById(
  id: GetUserByIdInput["id"],
): Promise<Record<string, unknown> | null> {
  return (await db
    .collection("user")
    .findOne({ _id: new ObjectId(id) })) as unknown as Record<
    string,
    unknown
  > | null;
}
