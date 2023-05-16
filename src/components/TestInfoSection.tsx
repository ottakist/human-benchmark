import DashChart from './DashChart'
import TestAbout from './TestAbout'
import { games } from '../utils/games'
interface TestProps {
  testName: string
  data: Array<{ round: number; score: number; average: number }>
}
const TestInfoSection = ({ testName, data }: TestProps) => {
  return (
    <section className='tablet:p-8'>
      <div className=' flex h-fit flex-wrap content-between pt-5 tablet:container tablet:flex-nowrap'>
        <div className='mr-5'>
          <DashChart data={data} />
        </div>
        <TestAbout
          paragraphs={
            games.find((game) => game.title.split(' ')[0] === testName)?.about
          }
        />
      </div>
    </section>
  )
}

export default TestInfoSection
