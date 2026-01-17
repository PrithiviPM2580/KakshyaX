import { db } from "@/lib/auth.lib.js";

export async function findUsers(
  options: FindAllOptions,
): Promise<Record<string, unknown>[]> {
  const { skip, limit, search, sortBy, order } = options;

  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const sortOrder = order === "asc" ? 1 : -1;

  const users = (await db
    .collection("user")
    .find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .toArray()) as unknown as Record<string, unknown>[];

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
