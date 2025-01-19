import { db } from "~/utils/db.server"

export default async () => {
  const users_count = (await db.user.findMany()).length;
  return {
    users_count: users_count
  }
}