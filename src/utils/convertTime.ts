export function convertTime(createdAtDate: number): {
  seconds: number
  minutes: number
  hours: number
  days: number
} {
  const currentDate = new Date()
  const durationMilliseconds = currentDate.getTime() - createdAtDate

  const seconds = Math.floor(durationMilliseconds / 1000) % 60
  const minutes = Math.floor(durationMilliseconds / 1000 / 60) % 60
  const hours = Math.floor(durationMilliseconds / 1000 / 60 / 60) % 24
  const days = Math.floor(durationMilliseconds / 1000 / 60 / 60 / 24)

  return { seconds, minutes, hours, days }
}
