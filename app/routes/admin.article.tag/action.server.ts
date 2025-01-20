import { ActionFunctionArgs, json } from "@remix-run/node";
import { db } from "~/utils/db.server";

export default async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  console.log("action", name)
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
  return json({
    erorr: false,
    message: 'Tag created successfully'
  },{
    status:200
  });
}