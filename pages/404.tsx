import Link from "next/link"
import Menu from "../components/menu/Menu"

const NotFound = () => {
  return (
    <Menu>
      <div className='text-center h-full flex justify-center items-center flex-col'>
        <p className='text-3xl mb-8'>&#128561;</p>
        <p className='text-4xl mb-8'>Oooops...</p>
        <p className='text-3xl mb-8'>That page cannot be found.</p>
        <p>Go back to the <Link href='/'><a className='text-blue-400 hover:underline'>HomePage</a></Link></p>
      </div>
    </Menu>
  )
}

export default NotFound
