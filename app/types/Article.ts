export type User ={
  id:number,
  email: string,
  password: string,
  banned: boolean,
  createdAt?: Date
}
export type Profile= {
  id: number,
  name?:string,
  position?: string,
  bio?:string,
  photo?:string,
  agent_id: number,
  createdAt?:Date,
  updatedAt?:Date
}
export type Agent = {
  id: number,
  email: string,
  password: string,
  banned: boolean,
  article?: Article[],
  profile?: Profile,
  createdAt?: Date
}
export type ArticleTag = {
  id:number,
  name: string,
}
export type ArticleCategory = {
  id:number,
  name: string
}
export type ArticleComment ={
  id: number,
  user_id: number,
  article_id: number,
  content:string,
  createdAt?: Date
}
export type Article = {
  id: number,
  preview_image?: string | null,
  title: string,
  content: string,
  view: number,
  tag?: ArticleTag[],
  comment?: ArticleComment[],
  agent_id: number,
  createdAt?: Date,
  updatedAt?: Date
}
export type CategoryOnArticle ={
  category_id: number,
  article_id: number
}