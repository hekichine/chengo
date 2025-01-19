import { MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import loaderServer from "./loader.server";
import actionServer from "./action.server";

export const meta: MetaFunction = () => {
  return [
    { title: 'User Manager' }
  ]
}
export const loader = loaderServer
export const action = actionServer
export default function EditUser(){
  const user = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [email, setEmail] = useState<string>(user.email);
  const [ban,setBan] = useState<boolean>(user.banned);
  const handleSubmit = ()=> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('banned', ban.toString());
    formData.append('type', user.type);
    fetcher.submit(formData, {method: 'post'});
  }
  return (
    <>
      <div className="p-5 bg-white shadow-sm rounded mx-auto">
        <input type="hidden" name="id" value={user.id} />
        <div className="max-w-sm">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white select-none">Email</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
              </svg>
            </span>
            <input readOnly type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
        </div>
        <label className="inline-flex items-center cursor-pointer mt-5 select-none">
          <input type="checkbox" name="banned" className="sr-only peer" checked={ban ? true : false} onChange={()=>setBan(!ban)} />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Banned</span>
        </label>
        <div className="mt-5">
          <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
        </div>

      </div>
    </>
  )
}