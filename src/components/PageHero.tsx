import { BsLightningFill } from 'react-icons/bs'
import { IconContext } from 'react-icons'
interface hero {
  title: string
  subtitle: string
  buttonShow: boolean
}
const PageHero = ({ title, subtitle, buttonShow }: hero) => {
  return (
    <main className=' flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden bg-background-blue-200  p-5 text-center text-white'>
      <div className='container tablet:px-[20px]'>
        <IconContext.Provider value={{ size: '128' }}>
          <BsLightningFill className='mx-auto fill-white' />
        </IconContext.Provider>
        <div className='mt-[30px] font-normal'>
          <h1 className=' text-[42px] tablet:text-[80px] '>{title}</h1>
          <h2 className='text-[28px] tablet:text-[24px]'>{subtitle}</h2>
        </div>
        {buttonShow && (
          <button className='mt-[30px] rounded-[3px] bg-background-yellow px-8 py-3 text-lg font-[600]  text-text_black duration-200 hover:bg-white'>
            Get Started
          </button>
        )}
      </div>
    </main>
  )
}
export default PageHero
