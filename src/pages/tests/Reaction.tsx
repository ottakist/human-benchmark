import { useRef, useState } from 'react'
import { PageHero, TestInfoSection, TestResult } from '../../components'
import { IoAlertCircle } from 'react-icons/io5'
import { ImClock2 } from 'react-icons/im'
import { BsCircleFill, BsLightningFill } from 'react-icons/bs'
const Reaction = () => {
  const [gameStart, setGameStart] = useState(false)
  const startTime = useRef<number>(0)
  const stopTime = useRef<number>(0)
  const timeoutId = useRef<number>(0)
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
    const rnd = Math.random() * 3 * 1000 + 1000
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
            chartData.length === 4
              ? 'Click button to restart'
              : 'Click to keep going'
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
        <TestResult
          background={gameStatus.background}
          icon={gameStatus.icon}
          result={gameStatus.message[0]}
          subString={gameStatus.message[1]}
          action={chartData.length === 4 ? null : handleClick}
          button={chartData.length === 4 ? () => setGameStart(true) : null}
        />
      ) : (
        <div
          onClick={() => {
            void startClick()
          }}
        >
          <PageHero
            icon={BsLightningFill}
            title='Reaction Time Test'
            subtitle='When the red box turns green, click as quickly as you can.'
            button={() => setGameStart(true)}
          />
        </div>
      )}
      <TestInfoSection testName='reaction' data={chartData} />
    </>
  )
}

export default Reaction
