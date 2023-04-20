import GameBtn from './GameBtn'
const GamesTable = () => {
  return (
    <section className=' bg-background-gray-500  tablet:p-[20px] '>
      <div className=' container bg-white tablet:bg-transparent tablet:flex w-full px-[20px] pt-[20px] tablet:mb-5'>
        <GameBtn />
        <GameBtn />
        <GameBtn />
      </div>
      <div className=' container bg-white  tablet:bg-transparent tablet:flex w-full px-[20px] tablet:mb-5'>
        <GameBtn />
        <GameBtn />
        <GameBtn />
      </div>
      <div className=' container bg-white tablet:bg-transparent tablet:flex w-full px-[20px] tablet:mb-5'>
        <GameBtn />
        <GameBtn />
      </div>
    </section>
  )
}

export default GamesTable
