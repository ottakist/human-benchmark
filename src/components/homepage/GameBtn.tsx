import { Link } from 'react-router-dom'
import { type btnProps } from '../../common/homeTypes'

const GameBtn = ({ icon: Icon, title, subtitle }: btnProps) => {
  return (
    <Link
      to={`tests/${title.split(' ')[0].toLowerCase()}`}
      className=' group block shrink-[1] grow-[1] basis-[0%]   cursor-pointer rounded-[5px] bg-white py-5 text-center shadow-[#0000001a] duration-200 hover:-translate-y-2 hover:shadow-2xl tablet:mr-[20px] tablet:p-[30px]'
    >
      <div className='mx-auto h-[100px] w-[100px]'>
        <Icon className=' h-full w-full fill-fill_blue stroke-white p-5 opacity-50 group-hover:fill-orange-500  group-hover:opacity-100' />
      </div>
      <h3 className=' text-[24px] font-bold capitalize'>{title}</h3>
      <p className='mb-2.5 mt-5 text-[18px]'>{subtitle}</p>
    </Link>
  )
}

export default GameBtn
