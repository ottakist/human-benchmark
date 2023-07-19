import { useEffect, useState } from 'react'
import { FiTarget } from 'react-icons/fi'
import { updateUserFields } from '../../firebase/functions'
import { useAuth0 } from '@auth0/auth0-react'
import { type TestType } from '../../common/testTypes'

const Aim = ({
  setGameStatus
}: {
  setGameStatus: React.Dispatch<React.SetStateAction<TestType>>
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [aimsCount, setAimsCount] = useState(30)
  const [time, setTime] = useState({ startTime: 0, endTime: 0 })
  const { user } = useAuth0()
  useEffect(() => {
    if (aimsCount === 0) {
      setGameStatus((prevGameStatus) => ({
        ...prevGameStatus,
        title: 'Average time per target',
        subtitle: `${Math.floor((time.endTime - time.startTime) / 30)} ms.`,
        showResult: true,
        background: 'bg-background-blue-200'
      }))
      void updateUserFields(user?.sub ?? '1', 'Aim Trainer', [
        `${Math.floor((time.endTime - time.startTime) / 30)} ms`
      ])
    }
  }, [aimsCount])
  function startTimer(): void {
    setTime((prevTime) => {
      return { ...prevTime, startTime: new Date().getTime() }
    })
  }

  function stopTimer(): void {
    setTime((prevTime) => {
      return { ...prevTime, endTime: new Date().getTime() }
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
