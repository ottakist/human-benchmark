import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { PageHero } from '..'
import { IoAlertCircle } from 'react-icons/io5'
import { ImClock2 } from 'react-icons/im'
import { BsCircleFill } from 'react-icons/bs'
import { type IconType } from 'react-icons'
interface TestProps {
  setGameStatus: React.Dispatch<
    React.SetStateAction<{
      isReady: boolean
      showResult: boolean
      title: string
      subtitle: string
      background: string
      icon?: IconType[]
      action?: () => void
      button?: () => void
    }>
  >
  gameStatus: {
    isReady: boolean
    showResult: boolean
    title: string
    subtitle: string
    icon: IconType[]
    action: () => void
    button: () => void
    background: string
  }
}
const Reaction = ({ setGameStatus, gameStatus }: TestProps) => {
  const startTime = useRef<number>(0)
  const stopTime = useRef<number>(0)
  const timeoutId = useRef<number>(0)
  interface ChartData {
    round: number
    score: number
    average: number
  }
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isReady, setIsReady] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  useEffect(() => {
    void startClick()
  }, [])
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const getStartTime = (): Promise<number> => {
    const rnd = Math.random() * 3 * 1000 + 1000
    setIsReady(false)
    setIsStarted(true)

    setGameStatus({
      ...gameStatus,
      icon: [BsCircleFill, BsCircleFill, BsCircleFill],
      title: 'Wait for green...',
      subtitle: '',
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
    setIsStarted(true)
    chartData.length === 5 && setChartData([])
    startTime.current = await getStartTime()
    setIsReady(true)

    setGameStatus({
      ...gameStatus,
      icon: [BsCircleFill, BsCircleFill, BsCircleFill],
      title: 'Click!',
      subtitle: '',
      background: 'bg-background-green'
    })
  }
  function endClick() {
    setIsStarted(false)
    stopTime.current = new Date().getTime()
    if (!isReady) {
      clearInterval(timeoutId.current)
      setIsReady(false)

      setGameStatus({
        ...gameStatus,
        icon: [IoAlertCircle],
        title: 'Too soon!',
        subtitle: 'Click to try again',
        background: 'bg-background-blue-200'
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
      setIsReady(false)
      setIsStarted(false)

      setGameStatus({
        ...gameStatus,
        icon: [ImClock2],
        title: `${(stopTime.current - startTime.current).toString()} ms`,
        subtitle:
          chartData.length === 4
            ? 'Click button to restart'
            : 'Click to keep going',
        background: 'bg-background-blue-200'
      })
    }
  }
  const handleClick = !isStarted ? startClick : endClick
  return (
    <>
      <PageHero
        background={gameStatus.background}
        icon={gameStatus.icon}
        title={gameStatus.title}
        subString={gameStatus.subtitle}
        action={chartData.length === 5 ? null : handleClick}
        button={chartData.length === 5 ? async () => await startClick() : null}
      />
    </>
  )
}

export default Reaction
