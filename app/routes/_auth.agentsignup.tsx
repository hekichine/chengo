import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, Link, redirect, useActionData } from "@remix-run/react";
import { validateSignUp } from "~/utils/validate.server";
import bcrypt from 'bcryptjs';

import {db} from '~/utils/db.server';
import { createUserSession, getUserId } from "~/utils/session.server";

export const loader = async ({request}: LoaderFunctionArgs) => {
 const user = await getUserId(request);
 if(user){
   return redirect('/')
 }
 return null;
}
export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors = validateSignUp(formData);
  if(Object.keys(errors).length){
    return json({errors})
  }
  const hassPassword = await bcrypt.hash(password,10);
  const user = await db.agent.findFirst({
    where: {
      email: email
    }
  })
  if(user){
    return json({
      errors: {
        email: ['Email already exists']
      }
    },{status:401})
  }
  const new_user = await db.agent.create({
    data: {
      email: email,
      password: hassPassword
    }
  })
  const user_id = new_user.id.toString();

  return createUserSession({
    request,
    userId: user_id,
    email: email,
    remember: true,
    redirectTo:'/admin'
  })
}

export default function SignUp(){
  const actionData = useActionData();

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 AgentSignUp">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link to={'/'} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                Teciby    
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <Form method="post" replace className="space-y-4 md:space-y-6" >
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            {actionData?.errors?.email?.map((err,i) => (
                              <div key={i} className="text-red-500">{err}</div>
                            ))}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {actionData?.errors?.password?.map((err,i) => (
                              <div key={i} className="text-red-500">{err}</div>
                            ))}
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password" name="confirm_password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {actionData?.errors?.confirmPassword?.map((err,i) => (
                              <div key={i} className="text-red-500">{err}</div>
                            ))}
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link to={'/'} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Terms and Conditions</Link></label>
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to={'/agentsignin'} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}