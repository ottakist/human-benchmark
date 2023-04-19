// BsFillLightningFill
// BsLightning
interface buttonProps {
  active: boolean
  values: { title: string, icon?: JSX.Element }
}
const NavButton = ({ active, values }: buttonProps): JSX.Element => {
  return (
    <a
      href='/'
      className={`flex items-center px-[12px] py-[15px] w-fit uppercase ${
        active ? 'bg-background-gray-300' : 'bg-white'
      }
         hover:bg-background-gray-300 duration-200
         `}
    >
      {values.icon}
      {values.title} {active}
    </a>
  )
}
export default NavButton
// ${values.icon === undefined ? 'hidden tablet:inline-block' : ' '}