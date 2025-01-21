import { useLoaderData } from "@remix-run/react";
import loaderServer from "./loader.server"
import ArticleContent from "./ArticleContent.client";
export const loader = loaderServer;

export default function Article(){
  const article = useLoaderData<typeof loader>();
  return(
    <>
      <article className="mt-10 w-full px-4 lg:max-w-[60%] mx-auto overflow-hidden">
        <h3 className="text-4xl text-center mb-5">{article.title}</h3>
        <p className="text-base text-center mb-5 text-gray-400">{new Intl.DateTimeFormat('vi-vn').format(article.updatedAt)}</p>
        <ArticleContent content={article.content} />
      </article>
    </>
  )
}