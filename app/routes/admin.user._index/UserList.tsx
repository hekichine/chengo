import { Link } from "@remix-run/react"
import type { UserType } from "./loader.server"
interface UserProp {
  users: UserType[]
}
export default function UserList({users}: UserProp){
  
  return(
    <>
      <div className="mt-6 mb-8 flex flex-col gap-12">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">Users</h6>
          </div>
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">email</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">banned</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">join</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400"></p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((user,index) => (
                    <tr key={user.id}>
                      <td className={`py-3 px-5 ${index !== users.length - 1 ? "border-b border-blue-gray-50" : ""}`}>
                        <div className="flex items-center gap-4">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{user.email}</p>
                        </div>
                      </td>
                      <td className={`py-3 px-5 ${index !== users.length - 1 ? "border-b border-blue-gray-50" : ""}`}>
                        <div className="flex items-center gap-4">
                          <div className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
                            {user.banned ? <div className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-red-600 to-red-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-semibold w-fit"><span>Lock</span></div>:<div className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-semibold w-fit"><span>Active</span></div>}
                          </div>
                        </div>
                      </td>
                      <td className={`py-3 px-5 ${index !== users.length - 1 ? "border-b border-blue-gray-50" : ""}`}>
                        <div className="flex items-center gap-4">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{new Intl.DateTimeFormat('vi-VN').format(user.createdAt)}</p>
                        </div>
                      </td>
                      <td className={`py-3 px-5 ${index !== users.length - 1 ? "border-b border-blue-gray-50" : ""}`}>
                        <div className="flex items-center gap-4">
                          <Link to={`/admin/user/${user.email}/edit?utb=user`} className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Edit</Link>
                        </div>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}