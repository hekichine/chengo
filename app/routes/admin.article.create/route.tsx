
import { useState } from "react";
import Editor from "../_components/Editor.client";
import Field from "../_components/Field";
import PageHeading from "../_components/PageHeading";
import { useFetcher, useLoaderData } from "@remix-run/react";

import loaderServer from "./loader.server";
import actionServer from "./action.server";

export const loader = loaderServer;
export const action = actionServer;


export default function CreateArticle(){
  const [title,setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const fetcher = useFetcher();

  const {tags} = useLoaderData<typeof loader>()
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tag', tag);
    fetcher.submit(formData,{method: 'post'});
  }
  return (
    <>
      <PageHeading text="Add new article" />
      <div className="flex gap-3">
        <div className="p-5 bg-white rounded shadow w-2/3">
          <div className="flex items-center justify-between gap-5 mb-5">
            <Field label="Title" value={title} onChange={handleTitle} placeholder="Hello from Chengo" classList="w-full" />
            <div className="block w-full">
              <label htmlFor="tags" className="text-base capitalize text-gray-500 select-none">Tags</label>
              <select name="tags" id="tags" value={tag} onChange={e => setTag(e.target.value)} className="block mt-2 w-full border p-3 rounded">
                <option value="" defaultValue={""} defaultChecked disabled >Choose a tag</option>
                {tags && tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
              </select>
            </div>
          </div>
          <Editor value={content} onChange={setContent} />
          <div className="flex items-center justify-end">
            <button onClick={handleSubmit} className="px-8 py-3 bg-blue-600 text-white mt-5 rounded hover:bg-blue-500 transition-all">Submit</button>
          </div>
        </div>
        <div className="bg-white shadow rounded w-1/3">
        </div>
      </div>
    </>
  )
}