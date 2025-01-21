import { ActionFunctionArgs, json, redirect } from "@remix-run/node"
import { db } from "~/utils/db.server";
import { getUserId } from "~/utils/session.server";

export default async({request}: ActionFunctionArgs)=> {
  const agent_id = await getUserId(request);
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const tag = Number(formData.get('tag'));
  const res = await db.article.create({
    data:{
      title: title,
      content: content,
      tag_id: tag,
      agent_id: Number(agent_id)
    }
  })
  if(!res){
    return json({
      status: false,
      message: 'Failed to create article'
    })
  }

  return redirect('/admin/article');
}