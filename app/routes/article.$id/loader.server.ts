import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export default async function loader({params} : LoaderFunctionArgs) {

  const {id} = params;
  const article = await db.article.findUnique({
    where: {id: Number(id)},
    include:{
      agent:{
        select:{
          profile: true
        }
      },
      tag: true
    }
  })
  if(!article) return redirect('/404')
  return article;
}