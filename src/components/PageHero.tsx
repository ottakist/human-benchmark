import { type IconType } from 'react-icons'
interface hero {
  title: string
  subtitle: string
  icon: IconType
  button: (() => void) | null
}
const PageHero = ({ icon: Icon, title, subtitle, button }: hero) => {
  return (
    <main className=' flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden bg-background-blue-200  p-5 text-center text-white'>
      <div className='container tablet:px-[20px]'>
        <div className='mx-auto  h-[128px] w-[100px]'>
          <Icon className='h-full w-full fill-white' />
        </div>
        <div className='mt-[30px] font-normal'>
          <h1 className=' text-[42px] capitalize tablet:text-[80px]'>
            {title}
          </h1>
          <h2 className='text-[28px] tablet:text-[24px]'>{subtitle}</h2>
        </div>
        {button != null && (
          <button
            onClick={button}
            className='mx-auto mt-[30px] block w-fit rounded-[3px] bg-background-yellow px-8 py-3 text-lg font-[600]  text-text_black duration-200 hover:bg-white'
          >
            Get Started
          </button>
        )}
      </div>
    </main>
  )
}
export default PageHero
