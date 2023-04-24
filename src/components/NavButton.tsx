import { useGlobalContext } from '../context'
// BsFillLightningFill
// BsLightning
interface buttonProps {
  values: { title: string; icon?: JSX.Element }
}
const NavButton = ({ values }: buttonProps): JSX.Element => {
  const { closeModal, activePage, setActivePage } = useGlobalContext()
  return (
    <a
      onClick={() => {
        closeModal()
        setActivePage(values.title)
      }}
      href='#'
      className={`flex items-center border-b-[2px]   px-[12px] py-[15px]  font-sans text-[18px] uppercase  leading-[18px] ${
        activePage === values.title ? 'bg-background-gray-300' : 'bg-white'
      }
         duration-200 hover:bg-background-gray-300
         `}
    >
      {values.icon}
      {values.title}
    </a>
  )
}
export default NavButton
