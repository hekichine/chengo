
import { db } from "~/utils/db.server"

export default async () => {
  const articles = await db.article.findMany({
    include:{
      agent:{
        select:{
          profile: true
        }
      },
      tag: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
  return articles
}