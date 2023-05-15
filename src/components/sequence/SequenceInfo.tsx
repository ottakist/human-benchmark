import { type IconType } from 'react-icons'
import { type Dispatch, type SetStateAction } from 'react'
interface InfoType {
  background: string
  icon: IconType[]
  result: string
  subString: string
  action: Dispatch<SetStateAction<number>>
}
const SequenceInfo = ({
  background,
  icon,
  result,
  subString,
  action
}: InfoType) => {
  return (
    <main className=' flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden bg-background-blue-200  p-5 text-center text-white'>
      <div className='container tablet:px-[20px]'>
        <div className='mx-auto h-[128px] w-[100px]'>
          {icon.map((Icon, index) => (
            <Icon className='h-full w-full fill-white' key={index} />
          ))}
        </div>
        <div className='mt-[30px] font-normal'>
          <h1 className=' text-[42px] capitalize tablet:text-[80px]'>
          {result}
          </h1>
          <h2 className='text-[28px] tablet:text-[24px]'>{subString}</h2>
        </div>

        <button className='mx-auto mt-[30px] block w-fit rounded-[3px] bg-background-yellow px-8 py-3 text-lg font-[600]  text-text_black duration-200 hover:bg-white'>
          Get Started
        </button>
      </div>
    </main>
    // <main
    //   onClick={() => {
    //     console.log('sequence process')
    //   }}
    //   className={`flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden ${background}  p-5 text-center text-white`}
    // >
    //   <div className='container tablet:px-[20px]'>
    //     <div className='mt-[30px] font-normal'>
    //       <h1 className=' text-[42px] tablet:text-[80px] '>
    //         {icon.map((Icon, index) => (
    //           <Icon className='mx-auto inline-flex pr-2' key={index} />
    //         ))}
    //       </h1>
    //       <h1 className=' text-[42px] tablet:text-[80px] '>{result}</h1>
    //       <h2 className='text-[28px] tablet:text-[24px]'>{subString}</h2>
    //     </div>
    //   </div>
    // </main>
  )
}

export default SequenceInfo
