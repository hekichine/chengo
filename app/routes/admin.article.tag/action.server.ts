import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export default async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  if(!name){
    return json({
      error: true,
      message: 'Name is required'
    },{
      status: 300
    });
  }
  const response = await db.articleTag.create({
    data:{
      name: name
    }
  });
  if(!response){
    return json({
      error: true,
      message: 'Server error'
    },{
      status: 500
    });
  }
  return redirect('/admin/article')
}