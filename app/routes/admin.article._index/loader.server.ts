
import { db } from "~/utils/db.server"

export default async () => {
  const articles = await db.article.findMany();
  return articles
}