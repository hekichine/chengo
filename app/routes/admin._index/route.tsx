import { MetaFunction } from "@remix-run/node"
import Totals from "./totals"
import loaderServer from "./loader.server"
import { useLoaderData } from "@remix-run/react";

export const loader = loaderServer;

export const meta: MetaFunction = () => {
  return [
    { title: 'Admin Dashboard'}
  ]
}

export default function AdminTemplate(){
  const {users_count} = useLoaderData<typeof loader>();
  return (
  <>
    <Totals users_count={users_count} />  
  </>
  )
}