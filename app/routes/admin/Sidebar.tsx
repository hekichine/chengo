import { NavLink, useLocation } from "@remix-run/react";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";

import { Fragment, ReactNode } from "react";
import { CiSettings, CiStar, CiViewList } from "react-icons/ci";
import { GrArticle } from "react-icons/gr";



type NavItem = {
  id: number,
  label: string,
  path?: string,
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

  },
  {
    id: 21,
    label: 'Product',
    path: '/admin/product',
    icon: <AiOutlineProduct />

  },
  {
    id: 22,
    label: 'Category',
    path: '/admin/product/category',
    icon: <MdOutlineCategory />
  },
  {
    id: 22,
    label: 'Review',
    path: '/admin/review',
    icon: <CiStar />
  },
  {
    id: 3,
    label: 'Article',
  },
  {
    id: 31,
    label: 'Article',
    path: '/admin/article',
    icon: <GrArticle />
  },
  {
    id: 32,
    label: 'Article Category',
    path: '/admin/article/category',
    icon: <MdOutlineCategory />
  },
  {
    id: 33,
    label: 'Comment',
    path: '/admin/article/comment',
    icon: <CiViewList />

  },
  {
    id: 4,
    label: "Auth",
  },
  {
    id: 5,
    label: "Settings",
    path: '/admin/profile',
    icon: <CiSettings />

  },
  {
    id: 6,
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
          <h2 className="text-3xl font-bold">Chengo</h2>
        </div>

        <nav className="mt-4">
          <ul className="flex flex-col gap-1">
            {navItems && navItems.map((item) => (
              <Fragment key={item.id}>
              {item.path ? (<li key={item.id}>
                <NavLink to={item.path} className={ `align-middle select-none font-semibold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${location.pathname === item.path ? "text-white bg-gray-800" : "text-gray-500 hover:bg-gray-500/10 active:bg-gray-500/30"} `}> {item.icon} {item.label}</NavLink>
              </li>) : ( <li key={item.id} className="uppercase text-sm font-semibold my-2 text-gray-400">{item.label}</li> )}
              </Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}