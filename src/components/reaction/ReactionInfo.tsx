import { type IconType } from 'react-icons'

interface InfoType {
  background: string
  icon: IconType[]
  result: string
  subString: string
  action: () => void
}
const ReactionInfo = ({
  background,
  icon,
  result,
  subString,
  action
}: InfoType) => {
  return (
    <main
      onClick={() => {
        action()
      }}
      className={`flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden ${background}  p-5 text-center text-white`}
    >
      <div className='container tablet:px-[20px]'>
        <div className='mt-[30px] font-normal'>
          <h1 className=' text-[42px] tablet:text-[80px] '>
            {icon.map((Icon, index) => (
              <Icon className='mx-auto inline-flex pr-2' key={index} />
            ))}
          </h1>
          <h1 className=' text-[42px] tablet:text-[80px] '>{result}</h1>
          <h2 className='text-[28px] tablet:text-[24px]'>{subString}</h2>
        </div>
      </div>
    </main>
  )
}

export default ReactionInfo
