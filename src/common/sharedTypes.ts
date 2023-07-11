import { type IconType } from 'react-icons'

export type hero = {
  title: string
  icon: IconType[]
  background: string
  subString: string
  action: (() => void) | null
  button: (() => void) | null
  secondBtn: (() => void) | undefined
}
