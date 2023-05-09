import { BsLightningFill } from 'react-icons/bs'
import { GamesTable, PageHero } from '../components'

const Home = () => {
  return (
    <>
      <PageHero
        icon={BsLightningFill}
        title='human benchmark'
        subtitle='Measure your abilities with brain games and cognitive tests.'
        buttonShow={true}
      />
      <GamesTable />
    </>
  )
}

export default Home
