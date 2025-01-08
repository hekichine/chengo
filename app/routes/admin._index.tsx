import { Outlet } from "@remix-run/react";

export default function Admin(){
  return (
    <>
      <header>Admin header</header>
      <Outlet />
      <footer>Admin footer</footer>
    </>
  )
}