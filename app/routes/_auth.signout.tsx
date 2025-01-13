import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { signout } from "~/utils/session.server";

export async function loader({request}: LoaderFunctionArgs){
  // console.log(request)
  return await signout(request);
}
export async function action({request}: ActionFunctionArgs) {
  return await signout(request);
}

export default function SignOut(){
  return(
    <>
    </>
  )
}