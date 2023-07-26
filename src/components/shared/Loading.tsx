const Loading = () => {
  return (
    <div className=' absolute flex  h-full  w-full  select-none flex-col items-center justify-center  overflow-hidden bg-background-blue-200   text-center'>
      <div className='animate-spin-slow h-[400px] w-[400px]  rounded-full  border-[16px]  border-dashed   border-white'></div>
    </div>
  )
}

export default Loading
