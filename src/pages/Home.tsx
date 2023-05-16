import { BsLightningFill } from 'react-icons/bs'
import { GamesTable, PageHero } from '../components'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        icon={BsLightningFill}
        title='human benchmark'
        subtitle='Measure your abilities with brain games and cognitive tests.'
        button={() => navigate('tests/reaction')}
      />
      <GamesTable />
    </>
  )
}

export default Home
