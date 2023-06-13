import DashChart from './DashChart'
import TestAbout from './TestAbout'
interface TestProps {
  chart: string
  about: string[]
}
const TestInfoSection = ({ chart, about }: TestProps) => {
  return (
    <section className='tablet:p-8'>
      <div className=' flex h-fit flex-wrap content-between pt-5 tablet:container tablet:flex-nowrap'>
        <div className='mr-5'>
          <DashChart chart={chart} />
        </div>
        <TestAbout paragraphs={about} />
      </div>
    </section>
  )
}

export default TestInfoSection
