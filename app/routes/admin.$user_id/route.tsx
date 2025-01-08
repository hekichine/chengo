import { useParams } from "@remix-run/react"

export default function UserInfo(){
  const {user_id} = useParams();
  return (
    <>
      <h1>User id: {user_id}</h1>
    </>
  )
}