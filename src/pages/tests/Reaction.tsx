import ReactionInfo from '../../components/reaction/ReactionInfo'
import { useRef, useState } from 'react'
import { PageHero, TestInfo } from '../../components'
import { IoAlertCircle } from 'react-icons/io5'
import { ImClock2 } from 'react-icons/im'
import { BsCircleFill } from 'react-icons/bs'
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
    icon: [BsCircleFill, BsCircleFill, BsCircleFill],
    message: ['Wait for green...', ''],
    background: 'bg-red-600'
  })
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const getStartTime = (): Promise<number> => {
    const rnd = Math.random() * 5 * 1000 + 1000
    setGameStatus({
      isReady: false,
      isStarted: true,
      icon: [BsCircleFill, BsCircleFill, BsCircleFill],
      message: ['Wait for green...', ''],
      background: 'bg-red-600'
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
      icon: [BsCircleFill, BsCircleFill, BsCircleFill],
      message: ['Click!', ''],
      background: 'bg-background-green'
    })
  }
  function endClick() {
    stopTime.current = new Date().getTime()
    if (!gameStatus.isReady) {
      clearInterval(timeoutId.current)
      setGameStatus({
        isReady: false,
        isStarted: false,
        icon: [IoAlertCircle],
        message: ['Too soon!', 'Click to try again'],
        background: 'bg-background-blue-500'
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
        icon: [ImClock2],
        message: [
          `${(stopTime.current - startTime.current).toString()} ms`,
          `${
            chartData.length === 4 ? 'Click to restart' : 'Click to keep going'
          }`
        ],
        background: 'bg-background-blue-500'
      })
    }
  }
  const handleClick = !gameStatus.isStarted ? startClick : endClick
  return (
    <>
      {gameStart ? (
        <ReactionInfo
          background={gameStatus.background}
          icon={gameStatus.icon}
          result={gameStatus.message[0]}
          subString={gameStatus.message[1]}
          action={handleClick}
        />
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
