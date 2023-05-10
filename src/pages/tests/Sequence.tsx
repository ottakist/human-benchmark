import { HiSquares2X2 } from 'react-icons/hi2'
import { PageHero, SequenceInfo, TestInfo } from '../../components'
import { useState } from 'react'
interface ChartData {
  round: number
  score: number
  average: number
}
// const arr = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0]
// ]
const numbers: number[] = []
function generateSequence(amount: number) {
  while (numbers.length < amount) {
    numbers.push(Math.floor(Math.random() * 9) + 1)
  }
}

const Sequence = () => {
  const [rounds, setRounds] = useState<number>(0)
  const [gameStart, setGameStart] = useState(false)
  const [chartData] = useState<ChartData[]>([])
  generateSequence(rounds)
  console.log(numbers)
  return (
    <>
      <SequenceInfo
        background='bg-background-blue-500'
        icon={[HiSquares2X2]}
        result={'msg1'}
        subString={'msg2'}
        action={setRounds}
      />
      <div
        onClick={() => {
          setRounds((rounds) => rounds + 1)
          setGameStart((prevState) => {
            return !prevState
          })
          // void startClick()
        }}
      >
        <PageHero
          icon={HiSquares2X2}
          title='sequence memory'
          subtitle='Remember an increasingly long pattern of button presses.'
          buttonShow={false}
        />
      </div>
      <TestInfo testName='sequence' data={chartData} />
    </>
  )
}

export default Sequence
