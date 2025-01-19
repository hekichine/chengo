
import { LoaderFunctionArgs } from "@remix-run/node"
import { db } from "~/utils/db.server"
import { getUserId } from "~/utils/session.server"
export type UserType = {
  id: number,
  email: string,
  banned: boolean,
  createdAt: Date
}
export type AgentType = {
  id: number,
  email: string,
  banned: boolean,
  createdAt: Date
}
export default async ({request}: LoaderFunctionArgs) => {
  const myID = await getUserId(request);
  const user_list = await db.user.findMany({
    select:{
      id: true,
      email:true,
      banned: true, 
      createdAt: true 
    },
    orderBy:{
      updatedAt: 'desc'
    }
  })
  const agent_list = await db.agent.findMany({
    where:{
      id:{
        not: Number(myID)
      }
    },
    select: {
      id: true,
      email: true,
      banned: true,
      createdAt: true,
      profile: {
        select: {
          name: true,
          position: true,
          bio: true,
          photo: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })
  // console.log(agent_list)
  return {
    user_list,
    agent_list
  };
}