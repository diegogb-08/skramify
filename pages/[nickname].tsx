
export type HomePage = {
  nickname: string
}

const HomePage = ({ nickname }: HomePage) => {
  return (
    <div>
      This is the HomePage {nickname}
    </div>
  )
}

export default HomePage
