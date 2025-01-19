import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export default async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const banned = formData.get('banned');
  const email = formData.get('email') as string;
  const type = formData.get('type');
  // console.log(formData)
  // return null;
  if(!email){
    return redirect('/admin/user')
  }
  // console.log(type)
  // return null;
  switch(type){
    case 'user': 
       {
        const update = await db.user.update({
          where: {
            email: email
          },
          data: {
            banned: banned === 'true' ? true : false
          }
        })
        if(!update) return redirect('/500')
        return redirect('/admin/user');
       }
    case 'agent': {
      const update = await db.agent.update({
        where: {
          email: email
        },
        data: {
          banned: banned === 'true' ? true : false
        }
      })
      if(!update) return redirect('/500')
      return redirect('/admin/user');
    }
  }
  
} 