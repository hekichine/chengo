import { Article } from "~/types/Article"

export type ArticleList = {
  articles: Article[]
}
export default function List({articles}: ArticleList){
  // console.log(articles)
  return(
    <>
      {articles && articles.length > 0 ? (
        <h2>Articles</h2>
      ): (<p>List article empty</p>)}    
      
    </>
  )
}