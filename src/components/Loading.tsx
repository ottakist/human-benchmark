const Loading = () => {
  return (
    <div className=' flex  h-[540px] cursor-pointer select-none flex-col items-center justify-center  overflow-hidden bg-background-blue-200  p-5 text-center'>
      <div className='h-[400px] w-[400px] animate-spin rounded-full  border-y-[16px] border-dashed  border-white'></div>
    </div>
  )
}

export default Loading
