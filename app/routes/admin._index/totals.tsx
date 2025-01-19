
import { AiFillProduct } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { RiArticleLine } from "react-icons/ri";
import CounterItem from "./CounterItem";

type Tastis ={
  users_count: number
}

export default function Totals({users_count} : Tastis){
  return (
    <>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <CounterItem title="User" icon={<FaUserFriends />} total={users_count} persistent={0} />
        <CounterItem title="Product" icon={<AiFillProduct />} total={0} persistent={0} />
        <CounterItem title="Article" icon={<RiArticleLine />} total={0} persistent={0} />
        <CounterItem title="Sales" icon={<IoStatsChart />} total={0} persistent={0} />
      </div>
    </>
  )
}