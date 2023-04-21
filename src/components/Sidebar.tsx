import { BsLightningFill } from 'react-icons/bs'
import NavButton from './NavButton'
import { useGlobalContext } from '../context'
const Sidebar = () => {
  const { isModalOpen, closeModal } = useGlobalContext()
  return (
    <div
      onClick={() => closeModal()}
      className={` fixed  inset-0 z-50 ${
        !isModalOpen ? 'hidden' : ' '
      } bg-background-gray-700`}
    >
      <aside className=' absolute bottom-0 top-0 w-[250px] bg-white'>
        <NavButton
          active={false}
          values={{
            title: 'human benchmark',
            icon: <BsLightningFill className=' mr-2 text-fill_grey' />
          }}
        />
        <NavButton
          active={false}
          values={{
            title: 'dashboard',
            icon: undefined
          }}
        />
        <NavButton
          active={false}
          values={{
            title: 'sign in',
            icon: undefined
          }}
        />
        <NavButton
          active={false}
          values={{
            title: 'login',
            icon: undefined
          }}
        />
      </aside>
    </div>
  )
}

export default Sidebar
