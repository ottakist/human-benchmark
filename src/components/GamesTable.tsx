import GameBtn from './GameBtn'
const GamesTable = () => {
  return (
    <section className=' bg-background-gray-500 tablet:p-5 tablet:pt-10'>
      <div className=' container  tablet:flex w-full tablet:mb-5'>
       <GameBtn/>
       <GameBtn/>
       <GameBtn/>
      </div>
      <div className=' container  tablet:flex w-full tablet:mb-5'>
       <GameBtn/>
       <GameBtn/>
       <GameBtn/>
      </div>
      <div className=' container  tablet:flex w-full tablet:mb-5'>
       <GameBtn/>
       <GameBtn/>
      </div>
    </section>
  )
}

export default GamesTable
