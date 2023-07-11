import { BsLightningFill } from 'react-icons/bs'
import NavButton from './NavButton'
import { useGlobalContext } from '../../context'
import { useAuth0 } from '@auth0/auth0-react'
const Sidebar = (): JSX.Element => {
  const { isModalOpen, closeModal } = useGlobalContext()
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  return (
    <div
      onClick={() => closeModal()}
      className={` fixed  inset-0 z-50 ${
        !isModalOpen ? 'hidden' : ' '
      } bg-background-gray-700`}
    >
      <aside className=' absolute bottom-0 top-0 w-[250px] bg-white'>
        <NavButton
          values={{
            title: 'human benchmark',
            icon: <BsLightningFill className=' mr-2 text-fill_grey' />
          }}
        />
        <NavButton
          values={{
            title: 'dashboard',
            icon: undefined
          }}
        />
        {!isAuthenticated ? (
          <>
            <NavButton
              values={{
                action: async () => await loginWithRedirect(),
                title: 'login',
                icon: undefined
              }}
            />
          </>
        ) : (
          <NavButton
            values={{
              action: async () => logout(),
              title: 'LogOut',
              icon: undefined
            }}
          />
        )}
      </aside>
    </div>
  )
}

export default Sidebar
