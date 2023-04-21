// BsFillLightningFill

import { useGlobalContext } from '../context'

// BsLightning
interface buttonProps {
  active: boolean
  values: { title: string; icon?: JSX.Element }
}
const NavButton = ({ active, values }: buttonProps): JSX.Element => {
  const { closeModal } = useGlobalContext()
  return (
    <a
      onClick={() => {
        closeModal()
      }}
      href='#'
      className={`flex items-center border-b-[2px]   px-[12px] py-[15px]  font-sans text-[18px] uppercase  leading-[18px] ${
        active ? 'bg-background-gray-300' : 'bg-white'
      }
         duration-200 hover:bg-background-gray-300
         `}
    >
      {values.icon}
      {values.title} {active}
    </a>
  )
}
export default NavButton
