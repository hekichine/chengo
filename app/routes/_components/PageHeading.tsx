export default function PageHeading({text}: {text:string}){
  return (
    <>
      <h1 className="text-2xl lg:text-4xl font-medium mb-4">{text}</h1>
    </>
  )
}