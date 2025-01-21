import { MetaFunction } from "@remix-run/node";
import PageHeading from "../_components/PageHeading";
import List from "./List";
import loaderServer from "./loader.server";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Article Manager'
    }
  ]
}
export const loader = loaderServer;

export default function Article(){
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const articles: any = useLoaderData<typeof loader>();
  return (
    <>
      <PageHeading text="Article" />
      <div className="bg-white rounded shadow">
        <div className="flex justify-end p-2 lg:p-5 gap-4">
          <Link to={'/admin/article/tag'} className="bg-blue-600 text-white px-5 py-2 hover:bg-blue-500 transition-all flex items-center justify-center rounded">Add Tag</Link>
          <Link to={'/admin/article/create'} className="bg-blue-600 text-white px-5 py-2 hover:bg-blue-500 transition-all flex items-center justify-center rounded">Add new</Link>
        </div>
        <div className="p-5">
          <List articles={articles}/>
        </div>
      </div>
    </>
  )
}