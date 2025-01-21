import { db } from "~/utils/db.server"
export default async () =>{
  const tags = await db.articleTag.findMany({
    select:{
      id:true,
      name:true
    }
  });
  return {tags};
}