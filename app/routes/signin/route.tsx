import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, Link, redirect, useActionData } from "@remix-run/react";
import { createUserSession, getUserId } from "~/utils/session.server";
import { validateSignIn } from "~/utils/validate.server";
import { db } from "~/utils/db.server";
import bcrypt from 'bcryptjs';

export async function loader({request}: LoaderFunctionArgs){
  const user = await getUserId(request);
  if(user){
    return redirect('/')
  }
  return null;
}
export async function action({request}: ActionFunctionArgs){
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const remember = formData.get('remember') === 'on' ? true : false;

  const errors = validateSignIn(formData);
  
  if(Object.keys(errors).length){
    return json({errors},{status:401})
  }
  // Check user exists
  const user = await db.user.findUnique({
    where: {
      email: email
    }
  })
  if(!user){
    errors.email = ['Email or password incorrect'];
    return json({errors},{status:401})
  }
  const isValid = await bcrypt.compare(password,user.password);
  if(!isValid){
    errors.email = ['Email or password incorrect'];
    return json({errors},{status:401})
  }
  let redirect: string = '/'
  if(user.role_id !== 1){
    redirect = '/admin'
  }

  return createUserSession({
    request,
    userId: user.id.toString(),
    roleId: user.role_id.toString(),
    remember: remember,
    redirectTo: redirect
  })
}

export default function SignIn(){
  const actionData = useActionData();
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link to={'/'} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                Teciby    
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <Form method="post" replace className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            {actionData?.errors?.email?.map((err,i) => (
                              <div key={i} className="text-red-500">{err}</div>
                            ))}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            {actionData?.errors?.password?.map((err,i) => (
                              <div key={i} className="text-red-500">{err}</div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <Link to={'/'} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</Link>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link to={'/signup'} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}