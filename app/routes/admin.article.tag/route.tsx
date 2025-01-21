import { useState } from "react";
import Field from "../_components/Field";
import PageHeading from "../_components/PageHeading";

import actionServer from "./action.server";
import { useFetcher } from "@remix-run/react";
export const action = actionServer;

export default function Tag(){
  const [tag,setTag] = useState<string>('');
  const fetcher = useFetcher();
  const handleSave = () => {
    const formData = new FormData();
    formData.append('name', tag);
    fetcher.submit(formData, { method: "post" });
  };

  return (
    <>
      <PageHeading text="Add Article Tag" /> 
      <div className="p-5 bg-white rounded shadow">
        <Field label="Tag Name" type="text" value={tag} onChange={e => setTag(e.target.value)} placeholder="Enter tag name" />
      </div>
      <div className="flex mt-5 items-center justify-end">
        <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white rounded py-3 px-8">Save</button>
      </div>
    </>
  )
}