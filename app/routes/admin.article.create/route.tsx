
import { useState } from "react";
import Editor from "../_components/Editor.client";
import Field from "../_components/Field";
import PageHeading from "../_components/PageHeading";

export default function CreateArticle(){
  const [title,setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    console.log(title,content)
  }
  return (
    <>
      <PageHeading text="Add new article" />
      <div className="p-5 bg-white rounded shadow">
        <div className="flex items-center justify-between gap-5 mb-5">
          <Field label="Title" value={title} onChange={handleTitle} placeholder="Hello from Chengo" classList="w-full" />
         
        </div>
        <Editor value={content} onChange={setContent} />
        <div className="flex items-center justify-end">
          <button onClick={handleSubmit} className="px-8 py-3 bg-blue-600 text-white mt-5 rounded hover:bg-blue-500 transition-all">Submit</button>
        </div>
      </div>
    </>
  )
}