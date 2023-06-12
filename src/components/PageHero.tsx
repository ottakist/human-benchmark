import { type IconType } from 'react-icons'
interface hero {
  title: string
  icon: IconType[]
  background: string
  subString: string
  action: (() => void) | null
  button: (() => void) | null
}
const PageHero = ({
  icon,
  action,
  background,
  title,
  subString,
  button
}: hero) => {
  return (
    <main
      onClick={() => {
        action?.()
      }}
      className={`flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden ${background}  p-5 text-center text-white`}
    >
      <div className='container tablet:px-[20px]'>
        <div className='mt-[30px] font-normal'>
          <h1
            className={` ${
              icon.length > 1 ? 'text-[42px] tablet:text-[80px]' : 'text-[80px]'
            }`}
          >
            {icon.map((Icon, index) => (
              <Icon className='mx-auto inline-flex pr-2' key={index} />
            ))}
          </h1>
          <h1 className=' text-[42px] capitalize tablet:text-[80px] '>
            {title}
          </h1>
          <h2 className='text-[28px] tablet:text-[24px]'>{subString}</h2>
        </div>
        {typeof button === 'function' && (
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
