import Link from "next/link"

interface NotFoundProps {
  linkHref: string
  textDestiny: string
}

const NotFound = ({ linkHref, textDestiny }: NotFoundProps) => {
  return (
    <div className='text-center h-full flex justify-center items-center flex-col'>
      <p className='text-3xl mb-8'>&#128561;</p>
      <p className='text-4xl mb-8'>Oooops...</p>
      <p className='text-3xl mb-8'>That page cannot be found.</p>
      <p>Go back to the <Link href={linkHref}><a className='text-blue-400 hover:underline'>{textDestiny}</a></Link></p>
    </div>
  )
}

export default NotFound
