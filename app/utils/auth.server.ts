import { redirect } from "@remix-run/node";
import { getUserId, getUserRole } from "./session.server";
import { abort } from "./abort.server";


export async function requireAdmin(request: Request) {
  const userId = await getUserId(request);
  const role = await getUserRole(request);

  if (!userId) {
    throw redirect("/signin");
  }
  if (role?.toLocaleLowerCase() !== "admin") {
    // throw redirect("/"); 
    abort(403,'You do not have permission to access this page.')
  }

  return true;
}