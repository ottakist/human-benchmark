import NavButton from './NavButton'

import { BsLightningFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useGlobalContext } from '../context'

const Navbar = (): JSX.Element => {
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
            <NavButton
              values={{
                title: 'login',
                icon: undefined
              }}
            />
            <NavButton
              values={{
                title: 'sign in',
                icon: undefined
              }}
            />
          </div>
        </div>
        {/* {isSidebarOpen && <Sidebar/>} */}
      </nav>
    </div>
  )
}

export default Navbar
