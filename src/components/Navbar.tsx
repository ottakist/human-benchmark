import NavButton from './NavButton'

import { BsLightningFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useGlobalContext } from '../context'
import { useAuth0 } from '@auth0/auth0-react'
const Navbar = (): JSX.Element => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const { openModal } = useGlobalContext()
  return (
    <div className='bg-white shadow-xl shadow-black tablet:shadow-none'>
      <nav className='container flex items-start justify-between  px-[10px]  tablet:px-[20px]   '>
        <div className='flex items-center tablet:px-[20px]'>
          <NavButton
            values={{
              title: 'human benchmark',
              icon: <BsLightningFill className='mr-[7px] text-fill_grey' />
            }}
          />
          <div className='hidden tablet:inline-block'>
            <NavButton
              values={{
                title: 'dashboard',
                icon: undefined
              }}
            />
          </div>
        </div>
        <div className='inline-block px-3 py-4 tablet:hidden'>
          <button onClick={() => openModal()}>
            <GiHamburgerMenu />
          </button>
        </div>
        <div className='hidden tablet:inline-block'>
          <div className='flex'>
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
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
