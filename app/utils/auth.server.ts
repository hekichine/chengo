import { redirect } from "@remix-run/node";
import { getUserEmail, getUserId } from "./session.server";
import { abort } from "./abort.server";
import { db } from "./db.server";


export async function requireAdmin(request: Request) {
  const agentId = await getUserId(request);
  const agent_email = await getUserEmail(request);
  // console.log(agentId,agent_email)
  if (!agentId || !agent_email) {
    throw redirect("/");
  }
  const agent =  await db.agent.findUnique({
    where: {
      email: agent_email
    },
    select:{
      banned: true
    }
  })
  if (agent?.banned === true || !agent) {
    // throw redirect("/"); 
    abort(403,'You do not have permission to access this page.')
  }

  return agent;
  
}