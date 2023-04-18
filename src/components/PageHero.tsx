import { BsLightningFill } from 'react-icons/bs'
import { IconContext } from 'react-icons'
const PageHero = () => {
  return (
    <main className=' flex flex-col justify-center h-[540px] p-5  text-white bg-background-blue-200 cursor-pointer  text-center select-none overflow-hidden'>
      <div className='container  '>
        <IconContext.Provider
          value={{ className: 'shared-class', size: '128' }}
        >
          <BsLightningFill className='fill-white mx-auto' />
        </IconContext.Provider>
        <div className='mt-[30px] font-normal'>
          <h1 className=' text-[80px]'>Human Benchmark</h1>
          <h2 className='text-[24px]'>
            Lorem ipsum dolor sit amet consectetur.
          </h2>
        </div>
        <button className='mt-[30px] py-3 px-8 bg-background-yellow text-lg rounded-[3px] text-text_black  font-[600] hover:bg-white'>
          Get Started
        </button>
      </div>
    </main>
  )
}
export default PageHero
