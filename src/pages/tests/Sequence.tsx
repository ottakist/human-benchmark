import { HiSquares2X2 } from 'react-icons/hi2'
import { BsFillSquareFill } from 'react-icons/bs'
import { PageHero, TestInfoSection, TestResult } from '../../components'
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
  const [gameStatus, setGameStatus] = useState({
    isReady: false,
    isStarted: false,
    message: ['Wait for green...', ''],
    background: 'bg-red-600'
  })
  const [chartData] = useState<ChartData[]>([])
  const [sequence, setSequence] = useState<number[]>([])
  const [rounds, setRounds] = useState<number>(0)
  const sequenceClick = useRef(0)
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
      // newSequence.push(0)
      return newSequence
    })
  }
  function iterateWithDelay(array: number[]) {
    let timeoutId: number
    for (let i = 0; i < array.length; i++) {
      timeoutId = setTimeout(() => {
        console.log('iterate')
        setSquareIndex(array[i])
        if (i === array.length - 1) {
          setSquareIndex(0)
          clearTimeout(timeoutId)
        }
      }, i * 1000)
    }
  }
  function sequenceMatching(clickIndex: number, buttonIndex: number) {
    return buttonIndex === sequence[clickIndex]
  }
  function triggerBtn(id: number) {
    setSquareIndex(id)
    const timeoutId = setTimeout(() => {
      setSquareIndex(0)
      return () => clearTimeout(timeoutId)
    }, 200)
  }
  return (
    <>
      {gameStart ? (
        <main className=' flex h-[540px] select-none flex-col  justify-center overflow-hidden bg-background-blue-500  p-5 text-center text-white'>
          <div className='container tablet:px-[20px]'>
            {arr.map((col, index) => (
              <div key={index} className='flex justify-center'>
                {col.map((square) => {
                  return (
                    <BsFillSquareFill
                      onClick={() => {
                        triggerBtn(square)
                        console.log(
                          sequenceMatching(sequenceClick.current, square)
                        )
                        sequenceClick.current += 1
                      }}
                      key={square}
                      className={` cursor-pointer p-2 ${
                        square === squareIndex
                          ? 'scale-100 fill-white opacity-100 transition-all delay-100 ease-out'
                          : 'fill-blue-dark scale-100 opacity-20  transition-all delay-100 ease-out'
                      }`}
                      size={132}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </main>
      ) : (
        // <TestResult
        //   background='bg-background-blue-500'
        //   icon={[HiSquares2X2]}
        //   result={`Level ${rounds}`}
        //   subString={'msg2'}
        //   action={null}
        //   button={() => setGameStart(true)}
        // />
        <PageHero
          icon={HiSquares2X2}
          title='sequence memory'
          subtitle='Remember an increasingly long pattern of button presses.'
          button={() => {
            setGameStart(true)
            generateSequence(9)
          }}
        />
      )}
      {/* <div
        onClick={() => {
          setRounds((rounds) => rounds + 1)
          setGameStart((prevState) => {
            return !prevState
          })
        }}
      >
        <PageHero
          icon={HiSquares2X2}
          title='sequence memory'
          subtitle='Remember an increasingly long pattern of button presses.'
          button={() => setGameStart(true)}
        />
      </div> */}
      <TestInfoSection testName='sequence' data={chartData} />
    </>
  )
}

export default Sequence
