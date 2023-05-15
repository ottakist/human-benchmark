import { HiSquares2X2 } from 'react-icons/hi2'
import { BsFillSquareFill } from 'react-icons/bs'
import { PageHero, SequenceInfo, TestInfo } from '../../components'
import { useEffect, useRef, useState } from 'react'
interface ChartData {
  round: number
  score: number
  average: number
}
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

const Sequence = () => {
  const [gameStart, setGameStart] = useState(false)
  const [chartData] = useState<ChartData[]>([])
  const [sequence, setSequence] = useState<number[]>([])
  const [rounds, setRounds] = useState<number>(2)
  const [squareIndex, setSquareIndex] = useState<number>(0)
  useEffect(() => {
    if (sequence.length > 0) {
      iterateWithDelay(sequence)
    }
  }, [sequence])
  function generateSequence(amount: number) {
    setSequence((prevSequence) => {
      const newSequence = [...prevSequence]
      while (newSequence.length < amount) {
        newSequence.push(Math.floor(Math.random() * 9) + 1)
      }
      return newSequence
    })
  }
  function iterateWithDelay(array: number[]) {
    let timeoutId: number
    for (let i = 0; i < array.length; i++) {
      timeoutId = setTimeout(() => {
        setSquareIndex(array[i])
        if (i === array.length - 1) {
          setSquareIndex(0)
          clearTimeout(timeoutId)
        }
      }, i * 1700)
    }
  }

  return (
    <>
      <main className=' flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden bg-background-blue-200  p-5 text-center text-white'>
        <div className='container tablet:px-[20px]'>
          {arr.map((col, index) => (
            <div
              onClick={() => {
                generateSequence(9)
              }}
              key={index}
              className='flex justify-center'
            >
              {col.map((square) => {
                return (
                  <BsFillSquareFill
                    key={square}
                    className={`p-2 ${
                      square === squareIndex
                        ? 'scale-100 fill-white opacity-100 transition-all delay-200 ease-out'
                        : 'fill-blue-dark opacity-20'
                    }`}
                    size={132}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </main>

      {/* <SequenceInfo
        background='bg-background-blue-500'
        icon={[HiSquares2X2]}
        result={`Level ${rounds}`}
        subString={'msg2'}
        action={setRounds}
      /> */}
      {/* <div
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
      </div> */}
      <TestInfo testName='sequence' data={chartData} />
    </>
  )
}

export default Sequence
