import { useRouter } from 'next/router'

const HomePage = () => {
  const router = useRouter()
  const { nickname } = router.query
  return (
    <div>
      This is the HomePage {nickname}
    </div>
  )
}

export default HomePage
