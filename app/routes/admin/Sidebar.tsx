import { NavLink, useLocation } from "@remix-run/react";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

import { ReactNode } from "react";



type NavItem = {
  id: number,
  label: string,
  path: string,
  icon?: ReactNode
}

const navItems: NavItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    path: '/admin',
    icon: <MdOutlineDashboard />
  },
  {
    id: 2,
    label: 'Product',
    path: '/admin/product',
    icon: <AiOutlineProduct />

  },
  {
    id: 3,
    label: 'Profile',
    path: '/admin/profile',
    icon: <CgProfile /> 
  },
  {
    id: 4,
    label: 'Sign out',
    path: '/signout',
    icon: <IoIosLogOut/> 
  }
]

export default function Sidebar(){
  const location = useLocation();
  return(
    <>
      <div className="w-20 md:w-72 fixed left-5 top-5 rounded-xl bg-white shadow p-5">
        <div className="logo-brand flex justify-center items-center p-5">
          <h2 className="text-3xl font-bold">Teciby</h2>
        </div>

        <nav className="mt-4">
          <ul className="flex flex-col gap-1">
            {navItems && navItems.map((item) => (
              <li key={item.id}>
                <NavLink to={item.path} className={ `align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${location.pathname === item.path ? "text-white bg-gray-800" : "text-gray-500 hover:bg-gray-500/10 active:bg-gray-500/30"} `}> {item.icon} {item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}