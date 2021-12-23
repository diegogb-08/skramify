import { useRouter } from 'next/router'
import useCheckAuthentication from '../hooks/useCheckAuthentication'

const HomePage = () => {
  useCheckAuthentication()
  const router = useRouter()
  const { nickname } = router.query
  return (
    <div>
      This is the HomePage {nickname}
    </div>
  )
}

export default HomePage
