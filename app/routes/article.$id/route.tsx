import { useLoaderData } from "@remix-run/react";
import loaderServer from "./loader.server"
import Timer from "~/utils/convertTime.client";

export const loader = loaderServer;
export default function Article(){
  const article = useLoaderData<typeof loader>();
  return(
    <>
      <article>
        <h3 className="text-4xl text-center mb-5">{article?.title}</h3>
        <p className="text-base text-center mb-5 text-gray-400">{Timer(article.updatedAt)}</p>
        <div dangerouslySetInnerHTML={{ __html: article?.content }}></div>
      </article>
    </>
  )
}