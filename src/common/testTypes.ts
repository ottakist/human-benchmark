import { type IconType } from 'react-icons'
export type TestType = {
  isReady: boolean
  showResult: boolean
  title: string
  subtitle: string
  background: string
  icon: IconType[]
  action?: () => void
  button?: () => void
}
export type GameProps = {
  icon: IconType
  title: string
  subtitle: string
  about: string[]
  chart: string
}
