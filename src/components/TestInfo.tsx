import DashChart from './DashChart'
import TestAbout from './TestAbout'
interface TestProps {
  data: Array<{ round: number; score: number; average: number }>
  paragraphs: string[]
}
const TestInfo = ({ data, paragraphs }: TestProps) => {
  return (
    <section className='p-8'>
      <div className='container flex h-fit flex-row  flex-wrap content-between pt-5 tablet:flex-nowrap'>
        <div className='mr-5'>
          <DashChart data={data} />
        </div>
        <TestAbout paragraphs={paragraphs} />
      </div>
    </section>
  )
}

export default TestInfo
