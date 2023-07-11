import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context'
import { type buttonProps } from '../../common/navTypes'
const NavButton = ({ values }: buttonProps): JSX.Element => {
  const { closeModal, activePage, setActivePage } = useGlobalContext()
  if (values.action) {
    return (
      <button
        onClick={() => {
          closeModal()
          void values.action?.()
        }}
        className={`flex items-center w-full px-[12px]  py-[15px] font-sans  text-[18px] uppercase leading-[18px] ${
          activePage === values.title ? 'bg-background-gray-300' : 'bg-white'
        }
         duration-200 hover:bg-background-gray-300
         `}
      >
        {values.icon}
        {values.title}
      </button>
    )
  } else {
    return (
      <Link
        to={values.title === 'human benchmark' ? '/' : `${values.title}`}
        onClick={() => {
          closeModal()
          setActivePage(values.title)
        }}
        className={`flex items-center px-[12px]  py-[15px] font-sans  text-[18px] uppercase leading-[18px] ${
          activePage === values.title ? 'bg-background-gray-300' : 'bg-white'
        }
         duration-200 hover:bg-background-gray-300
         `}
      >
        {values.icon}
        {values.title}
      </Link>
    )
  }
}
export default NavButton
