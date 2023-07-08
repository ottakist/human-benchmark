import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { PageHero } from '..'
import { IoAlertCircle } from 'react-icons/io5'
import { ImClock2 } from 'react-icons/im'
import { BsCircleFill } from 'react-icons/bs'
import { type IconType } from 'react-icons'
import { useAuth0 } from '@auth0/auth0-react'
import { updateUserFields } from '../../firebase/functions'
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
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined)
  const [resultData, setResultData] = useState<number[]>([])
  const [isReady, setIsReady] = useState(false)
  const { user } = useAuth0()
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
    resultData.length === 5 && setResultData([])
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
      setIsReady(false)
      setIsStarted(false)
      setResultData((prev) => [...prev, stopTime.current - startTime.current])
      if (resultData.length === 4) {
        void updateUserFields(
          user?.sub ?? '1',
          'Reaction Test',
          [
            `${Math.floor(
              resultData.reduce((cur, acc): number => {
                return (cur += acc)
              }, 0) / 5
            )} ms`
          ],
          388
        )
      }
      setGameStatus({
        ...gameStatus,
        icon: [ImClock2],
        title: `${(stopTime.current - startTime.current).toString()} ms`,
        subtitle:
          resultData.length === 4
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
        action={resultData.length === 5 ? null : handleClick}
        button={resultData.length === 5 ? async () => await startClick() : null}
      />
    </>
  )
}

export default Reaction
