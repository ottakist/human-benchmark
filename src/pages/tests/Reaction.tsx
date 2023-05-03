/* eslint-disable multiline-ternary */
import { useEffect, useRef, useState } from 'react'
import { PageHero, TestInfo } from '../../components'
import { IoAlertCircle } from 'react-icons/io5'
import { ImClock2 } from 'react-icons/im'
const Reaction = () => {
  const [gameStart, setGameStart] = useState(false)
  const startTime = useRef<number>(0)
  const stopTime = useRef<number>(0)
  const timeoutId = useRef<number>(0)
  const aboutTest = [
    'This is a simple tool to measure your reaction time.',
    'The average (median) reaction time is 273 milliseconds, according to the data collected so far.',
    'In addition to measuring your reaction time, this test is affected by the latency of your computer and monitor. Using a fast computer and low latency / high framerate monitor will improve your score.',
    'Scores in this test are faster than the aim trainer test, because you can react instantly without moving the cursor.',
    'This is discussed in further detail on the the statistics page. While an average human reaction time may fall between 200-250ms, your computer could be adding 10-50ms on top. Some modern TVs add as much as 150ms!',
    'If you want, you can keep track of your scores, and see your full history of reaction times. Just perform at least 5 clicks and then save.'
  ]
  interface ChartData {
    round: number
    score: number
    average: number
  }
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [gameStatus, setGameStatus] = useState({
    isReady: false,
    isStarted: false,
    gameMessage: ['Wait for green...', '', `\u25CF\u25CF\u25CF`],
    gameBackground: 'bg-red-600'
  })
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const getStartTime = (): Promise<number> => {
    const rnd = Math.random() * 5 * 1000
    setGameStatus({
      isReady: false,
      isStarted: true,
      gameMessage: ['Wait for green...', '', `\u25CF\u25CF\u25CF`],
      gameBackground: 'bg-red-600'
    })
    return new Promise((resolve) => {
      timeoutId.current = setTimeout(() => {
        const time = new Date().getTime()
        resolve(time)
      }, rnd)
    })
  }

  async function startClick() {
    chartData.length === 5 && setChartData([])
    startTime.current = await getStartTime()
    setGameStatus({
      isReady: true,
      isStarted: true,
      gameMessage: ['Click!', '', `\u25CF\u25CF\u25CF`],
      gameBackground: 'bg-background-green'
    })
  }
  function endClick() {
    stopTime.current = new Date().getTime()
    if (!gameStatus.isReady) {
      clearInterval(timeoutId.current)
      setGameStatus({
        isReady: false,
        isStarted: false,
        gameMessage: ['Too soon!', 'Click to try again', `Alert`],
        gameBackground: 'bg-background-blue-500'
      })
    } else {
      setChartData((prevState) => [
        ...prevState,
        {
          round: prevState.length + 1,
          score: stopTime.current - startTime.current,
          average: 273
        }
      ])
      setGameStatus({
        isReady: false,
        isStarted: false,
        gameMessage: [
          `${(stopTime.current - startTime.current).toString()} ms`,
          'Click to keep going',
          'Clock'
        ],
        gameBackground: 'bg-background-blue-500'
      })
    }
  }
  const handleClick = !gameStatus.isStarted ? startClick : endClick
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    chartData.map((data) => {
      if (data.round === 5) {
        console.log(data.score)
        setGameStatus({
          isReady: false,
          isStarted: false,
          gameMessage: [`${data.score} ms`, 'Click to restart', 'Clock'],
          gameBackground: 'bg-background-blue-500'
        })
      }
    })
  }, [chartData])
  return (
    <>
      {gameStart ? (
        <main
          onClick={() => {
            handleClick()
          }}
          className={`flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden ${gameStatus.gameBackground}  p-5 text-center text-white`}
        >
          <div className='container tablet:px-[20px]'>
            <div className='mt-[30px] font-normal'>
              <h1 className=' text-[42px] tablet:text-[80px] '>
                {gameStatus.gameMessage[2] === 'Alert' ? (
                  <IoAlertCircle className='mx-auto' />
                ) : gameStatus.gameMessage[2] === 'Clock' ? (
                  <ImClock2 className='mx-auto' />
                ) : (
                  gameStatus.gameMessage[2]
                )}
              </h1>
              <h1 className=' text-[42px] tablet:text-[80px] '>
                {gameStatus.gameMessage[0]}
              </h1>
              <h2 className='text-[28px] tablet:text-[24px]'>
                {gameStatus.gameMessage[1]}
              </h2>
            </div>
          </div>
        </main>
      ) : (
        <div
          onClick={() => {
            setGameStart(true)
            void startClick()
          }}
        >
          <PageHero
            title='Human Benchmark'
            subtitle='When the red box turns green, click as quickly as you can.'
            buttonShow={false}
          />
        </div>
      )}
      <TestInfo data={chartData} paragraphs={aboutTest} />
    </>
  )
}

export default Reaction
