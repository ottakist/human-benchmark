import { BsLightningFill } from 'react-icons/bs'
const GameBtn = () => {
  return (
    <a
      href='#'
      className=' block grow-[1] shrink-[1] basis-[0%] py-5   text-center cursor-pointer bg-white rounded-[5px] shadow-xl shadow-[#0000001a] hover:-translate-y-2 duration-200 group tablet:p-[30px] tablet:mr-[20px]'
    >
      <div className='mx-auto w-[100px] h-[100px]'>
        <BsLightningFill className=' fill-fill_blue opacity-50 p-5 w-full h-full group-hover:fill-orange-500  group-hover:opacity-100' />
      </div>
      <h3 className=' text-[24px]'>Reaction Time</h3>
      <p className='text-[18px] mt-5 mb-2.5'> Lorem ipsum dolor.</p>
    </a>
  )
}

export default GameBtn
