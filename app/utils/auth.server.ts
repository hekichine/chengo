import { redirect } from "@remix-run/node";
import { getRoleId } from "./session.server";
import { abort } from "./abort.server";

export async function requireAdmin(request: Request) {
  const role_id = await getRoleId(request);
  
  if (!role_id) {
    throw redirect("/signin");
  }

  if (role_id !== "3") {
    // throw redirect("/"); 
    abort(403,'You do not have permission to access this page.')
  }

  return true;
}