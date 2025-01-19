import { useNavigate } from "@remix-run/react";
import { IoIosArrowRoundBack } from "react-icons/io";

// app/routes/404.tsx
export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <button onClick={()=> navigate(-1)} className="mt-4 text-blue-500 hover:text-blue-300 transition-all flex items-center gap-1">
      <IoIosArrowRoundBack /> Back
      </button>
    </div>
  );
}