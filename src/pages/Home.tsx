import { BsLightningFill } from 'react-icons/bs'
import { GamesTable, PageHero } from '../components'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        icon={[BsLightningFill]}
        title='human benchmark'
        subString='Measure your abilities with brain games and cognitive tests.'
        action={null}
        background='bg-background-blue-200'
        button={() => navigate('tests/reaction')}
      />
      <GamesTable />
    </>
  )
}

export default Home
