import NavButton from './NavButton'
import { BsLightningFill } from 'react-icons/bs'

const Navbar = (): JSX.Element => {
  return (
    <nav className='container flex justify-between items-start px-5 font-sans text-[18px] text'>
      <div className='flex items-center'>
        <NavButton
          active={true}
          values={{
            title: 'human benchmark',
            icon: <BsLightningFill className=' text-fill_grey' />
          }}
        />
        <NavButton
          active={false}
          values={{
            title: 'dashboard',
            icon: undefined
          }}
        />
      </div>
      <div className='flex'>
        <NavButton
          active={false}
          values={{
            title: 'login',
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
      </div>
    </nav>
  )
}

export default Navbar
