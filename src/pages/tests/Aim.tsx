import { useState } from 'react'
import { PageHero, TestInfoSection, TestResult } from '../../components'
import { FiTarget } from 'react-icons/fi'
const Aim = () => {
  const [aimsCount, setAimsCount] = useState(30)
  const [gameStart, setGameStart] = useState(false)
  const [gameStatus, setGameStatus] = useState({
    isReady: false,
    showResult: false,
    title: 'sequence memory',
    subtitle: 'Remember an increasingly long pattern of button presses.',
    background: 'bg-background-blue-200'
  })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState({ startTime: 0, endTime: 0 })
  function startTimer(): void {
    const startTime = new Date().getTime()
    setTime({ startTime, endTime: 0 })
  }
  function stopTimer(): void {
    const endTime = new Date().getTime()
    setTime({ ...time, endTime })
  }
  function moveTarget() {
    aimsCount === 30 && startTimer()
    if (aimsCount === 1) {
      stopTimer()
      setGameStatus({ ...gameStatus, showResult: true })
    }

    const { width = 0, height = 0 } =
      document.getElementById('target-container')?.getBoundingClientRect() ?? {}
    const x = Math.floor(Math.random() * (width - 80))
    const y = Math.floor(Math.random() * (height - 80))
    setPosition({ x, y })
  }
  return (
    <>
      {gameStart ? (
        <>
          {gameStatus.showResult ? (
            <TestResult
              background='bg-background-blue-200'
              icon={[FiTarget]}
              result={`Average time per target`}
              subString={`${Math.floor(
                (time.endTime - time.startTime) / 30
              )} ms.`}
              action={() => {}}
              button={() => {
                setAimsCount(30)
                setGameStatus({ ...gameStatus, showResult: false })
              }}
            />
          ) : (
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
                  className={`absolute m-0 cursor-pointer text-[80px]`}
                  style={{
                    transform: `matrix(1, 0, 0, 1, ${position.x}, ${position.y})`
                  }}
                />
              </div>
            </main>
          )}
        </>
      ) : (
        <PageHero
          icon={FiTarget}
          title='aim trainer'
          subtitle='How quickly can you hit all the targets?'
          button={() => {
            setGameStart(true)
          }}
        />
      )}

      <TestInfoSection testName='sequence' data={[]} />
    </>
  )
}

export default Aim
