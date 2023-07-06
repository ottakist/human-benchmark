import { useEffect, useState } from 'react'
import { convertTime } from '../utils/convertTime'

const useTimePassed = (createdAt: number) => {
  const [timePassed, setTimePassed] = useState('')

  useEffect(() => {
    const intervalVal = convertTime(createdAt)
    const { days, hours, minutes, seconds } = intervalVal

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
  }, [createdAt])

  return timePassed
}

export default useTimePassed
