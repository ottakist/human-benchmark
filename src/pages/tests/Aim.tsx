import { useEffect, useState } from 'react'
import { type IconType } from 'react-icons'
import { FiTarget } from 'react-icons/fi'
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
}
const Aim = ({ setGameStatus }: TestProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [aimsCount, setAimsCount] = useState(30)
  const [time, setTime] = useState({ startTime: 0, endTime: 0 })
  useEffect(() => {
    if (aimsCount === 0) {
      setGameStatus((prevGameStatus) => ({
        ...prevGameStatus,
        title: 'Average time per target',
        subtitle: `${Math.floor((time.endTime - time.startTime) / 30)} ms.`,
        showResult: true,
        background: 'bg-background-blue-200'
      }))
    }
  }, [aimsCount])
  function startTimer(): void {
    const startTime = new Date().getTime()
    setTime((prevTime) => {
      return { ...prevTime, startTime }
    })
  }

  function stopTimer(): void {
    const endTime = new Date().getTime()
    setTime((prevTime) => {
      return { ...prevTime, endTime }
    })
  }
  function moveTarget() {
    aimsCount === 30 && startTimer()
    aimsCount === 1 && stopTimer()

    const { width = 0, height = 0 } =
      document.getElementById('target-container')?.getBoundingClientRect() ?? {}
    const x = Math.floor(Math.random() * (width - 80))
    const y = Math.floor(Math.random() * (height - 80))
    setPosition({ x, y })
  }
  return (
    <>
      <main
        className={`transition-background flex h-[540px] select-none  flex-col justify-center overflow-hidden bg-background-blue-200 p-5 text-center   text-white duration-300 ease-linear`}
      >
        <span className='text-center font-sans text-[28px] font-normal'>
          <span className='mr-2 opacity-60'>Remaining</span>
          <span>{aimsCount}</span>
        </span>
        <div id='target-container' className='container relative  h-full'>
          <FiTarget
            onClick={() => {
              moveTarget()
              setAimsCount((prev) => (prev -= 1))
            }}
            className={`absolute m-0 cursor-pointer text-[95px] focus:outline-none`}
            style={{
              transform: `matrix(1, 0, 0, 1, ${position.x}, ${position.y})`
            }}
          />
        </div>
      </main>
    </>
  )
}

export default Aim
