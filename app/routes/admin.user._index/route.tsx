import { MetaFunction } from "@remix-run/node"
import loaderServer from './loader.server';
import { useLoaderData } from "@remix-run/react";
import UserList from "./UserList";
import AgentList from "./AgentList";
export const loader = loaderServer;
export const meta: MetaFunction = () => {
  return [
    { title: 'User Manager' }
  ]
}

export default function User(){
  const {user_list,agent_list} = useLoaderData<typeof loader>();
  return (
    <>
      <UserList users={user_list} />
      <div className="mt-5 mb-5 h-1 block"></div>
      <AgentList agents={agent_list} />
    </>
  )
}