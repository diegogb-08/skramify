import Link from "next/link"
import Menu from "../components/menu/Menu"
import NotFound from "../components/NotFound"

const ErrorPage = () => {
  return (
    <Menu>
      <NotFound linkHref='/' textDestiny='HomePage' />
    </Menu>
  )
}

export default ErrorPage
