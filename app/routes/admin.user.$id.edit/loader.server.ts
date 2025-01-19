import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/utils/db.server"
export default async ({request,params}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const utb = url.searchParams.get('utb');  
  // console.log(utb)
  if(utb == 'user'){
    const user = await db.user.findUnique({
      where: {
        email: params.id
      }
    })
    if(!user){
      return redirect('/404')
    }
    return { ...user, type: 'user'};
  }else{
    const agent = await db.agent.findUnique({
      where: {
        email: params.id
      }
    })
    if(!agent){
      return redirect('/404')
    }
    return {...agent,type: 'agent'};
  }
}