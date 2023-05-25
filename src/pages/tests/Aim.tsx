import { useState } from 'react'
import { PageHero, TestInfoSection, TestResult } from '../../components'
import { FiTarget } from 'react-icons/fi'
const Aim = () => {
  // const [aimsCount, setAimsCount] = useState(30)
  // const [position, setPosition] = useState({ x: 182.604, y: 249.483 })
  const [time, setTime] = useState({ startTime: 0, endTime: 0 })
  function startTimer(): void {
    const startTime = new Date().getTime()
    setTime({ startTime, endTime: 0 })
  }
  function EndTimer(): void {
    const endTime = new Date().getTime()
    setTime({ ...time, endTime })
  }
  return (
    <>
      <PageHero
        icon={FiTarget}
        title='aim trainer'
        subtitle='How quickly can you hit all the targets?'
        button={() => {
          startTimer()
        }}
      />
      <TestResult
        background='bg-background-blue-500'
        icon={[FiTarget]}
        result={`Average time per target`}
        subString={`${Math.floor(time.endTime - time.startTime) / 30} ms.`}
        action={() => {}}
        button={() => {
          EndTimer()
          console.log(Math.floor(time.endTime - time.startTime) / 30)
        }}
      />
      <TestInfoSection testName='sequence' data={[]} />
    </>
  )
}

export default Aim
