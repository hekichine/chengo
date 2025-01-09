import { Link, Outlet } from "@remix-run/react";
import Sizebar from "./Sizebar";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { requireAdmin } from "~/utils/auth.server";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";


export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAdmin(request);
  return json({ user });
}

export default function Admin(){
  return (
    <>
      <Sizebar />
      <Outlet />
      <footer>Admin footer</footer>
    </>
  )
}

// app/routes/admin.tsx

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">
            {error.status} - {error.data.message}
          </h1>
          <Link className="text-blue-500 hover:underline" to={'/'}>
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container m-auto h-screen flex items-center flex-col justify-center">
      
    </div>
  );
}