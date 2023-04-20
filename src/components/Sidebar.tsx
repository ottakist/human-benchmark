import { BsLightningFill } from 'react-icons/bs'
import NavButton from './NavButton'
const Sidebar = () => {
  return (
    <div className=' fixed inset-0 bg-background-gray-700 z-50'>
      <aside className=' bg-white absolute w-[250px] top-0 bottom-0'>
        <NavButton
          active={false}
          values={{
            title: 'human benchmark',
            icon: <BsLightningFill className=' text-fill_grey mr-2' />
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
