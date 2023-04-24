import { FaQuestion } from 'react-icons/fa'
const Error = () => {
  return (
    <section className=' relative mx-auto my-0 max-w-[1010px]  p-0 text-center tablet:p-8'>
      <div className='  block bg-white px-0 py-5  tablet:rounded-md tablet:p-[30px] tablet:shadow-md'>
        <div className=''>
          <FaQuestion className=' my-[30px] h-[180px] w-full' />
          <h1 className=' text-[36px]'>Not Found</h1>
          <p className=' mt-4 text-[18px]'>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </section>
  )
}

export default Error
