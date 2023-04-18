import GameBtn from './GameBtn'
const GamesTable = () => {
  return (
    <section className=' bg-background-gray-500 p-5 pt-10'>
      <div className=' container  flex w-full mb-5'>
       <GameBtn/>
       <GameBtn/>
       <GameBtn/>
      </div>
      <div className=' container  flex w-full mb-5'>
       <GameBtn/>
       <GameBtn/>
       <GameBtn/>
      </div>
      <div className=' container  flex w-full mb-5'>
       <GameBtn/>
       <GameBtn/>
      </div>
    </section>
  )
}

export default GamesTable
