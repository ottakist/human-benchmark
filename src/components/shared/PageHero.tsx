import { type hero } from "../../common/sharedTypes"

const PageHero = ({
  icon,
  action,
  background,
  title,
  subString,
  secondBtn,
  button
}: hero): JSX.Element => {
  return (
    <main
      onClick={() => {
        action?.()
      }}
      className={`flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden ${background}  p-5 text-center text-white`}
    >
      <div className='container flex flex-col  items-center justify-around tablet:px-[20px]'>
        <div className='mt-[30px] font-normal'>
          <h1
            className={` flex justify-center ${
              icon.length > 1
                ? 'text-[42px] tablet:text-[80px]'
                : 'text-[128px]'
            }`}
          >
            {icon.map((Icon, index) => (
              <Icon className='inline-flex pr-2' key={index} />
            ))}
          </h1>
          <h1 className=' text-[42px] capitalize tablet:text-[80px] '>
            {title}
          </h1>
          <h2 className='text-[28px] tablet:text-[24px]'>{subString}</h2>
        </div>
        <div className='flex'>
          {typeof button === 'function' && (
            <button
              onClick={button}
              className='mx-1  mt-[30px] block w-fit rounded-[3px] bg-background-yellow px-8 py-3 text-lg font-[600]  text-text_black duration-200 hover:bg-white'
            >
              Get Started
            </button>
          )}
          {secondBtn && (
            <button
              onClick={secondBtn}
              className='mx-1 mt-[30px] block w-fit rounded-[3px] bg-white bg-opacity-50 px-8 py-3 text-lg font-[600]  text-text_black duration-200 hover:bg-opacity-100'
            >
              Save Result
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
export default PageHero
