
import { Link } from "@remix-run/react"
import { ArticleGet } from "~/types/Article"
import Timer from "~/utils/convertTime.client"

export type ArticlListProps = {
  articles: ArticleGet[]
}
export default function List({articles}: ArticlListProps){
  // console.log(articles)
  return(
    <>
      <div className="mt-6 mb-8 flex flex-col gap-12">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Article</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">By</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Published</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Updated</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400"></p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  articles && articles.map((article,index) => (
                    <tr key={article.id}>
                      <td className={`py-3 px-5 ${index !== articles.length - 1 ? "border-b border-blue-gray-50" : ""}`}>
                        <div className="flex items-center">
                          {article.preview_image && article.preview_image !== null ? (
                            <img src={article.preview_image} alt={article.title} />
                          ): ""}
                          <h3 className="text-base">{article.title}</h3>
                        </div>
                      </td>
                      <td className={`py-3 px-5 ${index !== articles.length - 1 ? "border-b border-blue-gray-50" : ""}`}>
                        {article.agent.profile.name}
                      </td>
                      <td className={`py-3 px-5 ${index !== articles.length - 1 ? "border-b border-blue-gray-50" : ""}`}>
                        {article.published ?  <div className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-red-600 to-red-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-semibold w-fit"><span>Draf</span></div>:<div className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-semibold w-fit"><span>Active</span></div>}
                      </td>
                      <td className={`py-3 px-5 ${index !== articles.length - 1 ? "border-b border-blue-gray-50" : ""}`}>
                        {Timer(articles[0].updatedAt)}
                      </td>
                      <td className={`py-3 px-5 ${index !== articles.length - 1 ? "border-b border-blue-gray-50" : ""}`}>
                        <div className="flex items-center gap-4">
                          <Link to={`/admin/article/${article.id}/edit`} className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Edit</Link>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}