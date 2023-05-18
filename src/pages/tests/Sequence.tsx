import { HiSquares2X2 } from 'react-icons/hi2'
import { BsFillSquareFill } from 'react-icons/bs'
import { PageHero, TestInfoSection, TestResult } from '../../components'
import { useEffect, useState } from 'react'
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
    showResult: false,
    title: 'sequence memory',
    subtitle: 'Remember an increasingly long pattern of button presses.',
    background: 'bg-red-600'
  })
  const [chartData] = useState<ChartData[]>([])
  const [sequence, setSequence] = useState<number[]>([])
  const [rounds, setRounds] = useState<number>(0)
  const [sequenceClick, setSequenceClick] = useState<number>(0)
  const [squareIndex, setSquareIndex] = useState<number>(0)
  useEffect(() => {
    setGameStatus({ ...gameStatus, isReady: false })
    if (sequence.length > 0) {
      const id = setTimeout(() => {
        iterateWithDelay(sequence)
      }, 600)
      return () => clearTimeout(id)
    }
  }, [sequence])
  useEffect(() => {
    generateSequence(rounds)
    setSequenceClick(0)
  }, [rounds])
  function generateSequence(amount: number) {
    setSequence((prevSequence) => {
      const newSequence = [...prevSequence]
      while (newSequence.length < amount) {
        const num = Math.floor(Math.random() * 9) + 1
        newSequence[newSequence.length - 1] !== num && newSequence.push(num)
      }
      return newSequence
    })
  }
  function iterateWithDelay(array: number[]) {
    setGameStatus({ ...gameStatus, isReady: false })
    let timeoutId: number
    for (let i = 0; i < array.length; i++) {
      timeoutId = setTimeout(() => {
        triggerBtn(array[i])
        if (i === array.length - 1) {
          clearTimeout(timeoutId)
          setGameStatus({ ...gameStatus, isReady: true })
        }
      }, i * 1000)
    }
  }
  function sequenceMatching(clickIndex: number, buttonIndex: number) {
    if (buttonIndex === sequence[clickIndex]) {
      if (clickIndex === sequence.length - 1) {
        setRounds((prev) => (prev += 1))
      }
    } else {
      setGameStatus({
        ...gameStatus,
        isReady: false,
        showResult: true,
        title: `Level ${rounds}`,
        subtitle: 'Click button to restart'
      })
      setSequence([])
    }
  }
  function triggerBtn(id: number) {
    setSquareIndex(id)
    const timeoutId = setTimeout(() => {
      setSquareIndex(0)
    }, 300)
    return () => clearTimeout(timeoutId)
  }
  return (
    <>
      {gameStart ? (
        <>
          {gameStatus.showResult ? (
            <TestResult
              background='bg-background-blue-500'
              icon={[HiSquares2X2]}
              result={gameStatus.title}
              subString={gameStatus.subtitle}
              action={null}
              button={() => {
                setGameStatus({ ...gameStatus, showResult: false })
                setRounds(1)
                generateSequence(1)
                setSequenceClick(0)
              }}
            />
          ) : (
            <main className=' flex h-[540px] select-none flex-col  justify-center overflow-hidden bg-background-blue-200  p-5 text-center text-white'>
              <div className='container tablet:px-[20px]'>
                <h2 className='text-[28px] tablet:text-[24px]'>
                  Level: {rounds}
                </h2>
                <div className='mt-7'>
                  {arr.map((col, index) => (
                    <div key={index} className='flex justify-center'>
                      {col.map((square) => {
                        return (
                          <BsFillSquareFill
                            onClick={() => {
                              triggerBtn(square)
                              if (gameStatus.isReady && sequence.length !== 0) {
                                setSequenceClick((prev) => prev + 1)
                                sequenceMatching(sequenceClick, square)
                              }
                            }}
                            key={square}
                            className={` cursor-pointer p-2 ${
                              square === squareIndex
                                ? 'scale-100 fill-white opacity-100 transition-all delay-100 ease-out'
                                : ' scale-100 fill-fill_blue_dark opacity-20  transition-all delay-100 ease-out'
                            }`}
                            size={132}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </main>
          )}
        </>
      ) : (
        <PageHero
          icon={HiSquares2X2}
          title='sequence memory'
          subtitle='Remember an increasingly long pattern of button presses.'
          button={() => {
            setGameStart(true)
            setRounds(1)
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
