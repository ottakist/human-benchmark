import { useEffect, useState } from 'react'
import { convertTime } from '../utils/convertTime'
const DashUser = ({ name, createdAt }: { name: string; createdAt: number }) => {
  const [timePassed, setTimePassed] = useState('')
  const intervalVal = convertTime(createdAt)
  const { days, hours, minutes, seconds } = intervalVal
  useEffect(() => {
    if (days > 0) {
      setTimePassed(`${days} day${days !== 1 ? 's' : ''} ago`)
    } else if (hours > 0) {
      setTimePassed(`${hours} hour${hours !== 1 ? 's' : ''} ago`)
    } else if (minutes > 0) {
      setTimePassed(`${minutes} minute${minutes !== 1 ? 's' : ''} ago`)
    } else if (seconds > 0) {
      setTimePassed(`${seconds} second${seconds !== 1 ? 's' : ''} ago`)
    } else {
      setTimePassed('Just now')
    }
  }, [intervalVal])
  return (
    <section className='bg-white p-7 pt-5'>
      <div className='flex flex-col font-sans text-xl text-text_black'>
        User <div className=' text-4xl font-bold opacity-100'>{name}</div>
      </div>
      <div className='flex flex-col font-sans text-xl text-text_black'>
        Joined{' '}
        <div className=' text-md font-bold opacity-100'>{timePassed}</div>
      </div>
    </section>
  )
}

export default DashUser
