import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Chengo" },
    { name: "description", content: "Welcome to Chengo!" },
  ];
};

export default function Index() {
  return (
   <>
    <header>HEader</header>
    <Outlet />
    <footer>Footer</footer>
    </>
  );
}
