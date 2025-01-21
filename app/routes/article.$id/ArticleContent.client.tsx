import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface PropsType {
  content: string
}
export default function ArticleContent({content}: PropsType){
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  },[])
  return(
    <>
    {loaded && (  
      <ReactQuill value={content} readOnly={true} theme={"snow"} /> 
    )}
    </>
  )
}