import GameBtn from './GameBtn'
const GamesTable = () => {
  return (
    <section className=' bg-background-gray-500  tablet:p-[20px] '>
      <div className=' container w-full bg-white px-[20px] pt-[20px] tablet:mb-5 tablet:flex tablet:bg-transparent'>
        <GameBtn />
        <GameBtn />
        <GameBtn />
      </div>
      <div className=' container w-full  bg-white px-[20px] tablet:mb-5 tablet:flex tablet:bg-transparent'>
        <GameBtn />
        <GameBtn />
        <GameBtn />
      </div>
      <div className=' container w-full bg-white px-[20px] tablet:mb-5 tablet:flex tablet:bg-transparent'>
        <GameBtn />
        <GameBtn />
      </div>
    </section>
  )
}

export default GamesTable
