import { HiSquares2X2 } from 'react-icons/hi2'
import { PageHero, TestInfo } from '../../components'
import { useState } from 'react'
interface ChartData {
  round: number
  score: number
  average: number
}
const Sequence = () => {
  const [chartData, setChartData] = useState<ChartData[]>([])
  return (
    <>
      <PageHero
        icon={HiSquares2X2}
        title='sequence memory'
        subtitle='Remember an increasingly long pattern of button presses.'
        buttonShow={false}
      />
      <TestInfo testName='sequence' data={chartData} />
    </>
  )
}

export default Sequence
