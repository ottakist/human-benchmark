import { useEffect, useState } from 'react'
import { getUsersRatings } from '../firebase/functions/getUsersRating'
const LeaderBoard = () => {
  const [usersData, setUsersData] = useState<
    Array<{
      userName: string
      userImage: string
      record: number
    }>
  >([])
  const [sortOption, setSortOption] = useState('Aim Trainer')
  const fetchUsersData = async () => {
    try {
      const data = await getUsersRatings(sortOption)
      if (data?.results !== undefined) {
        usersData.sort((a, b) =>
          data.type !== 'reaction' ? b.record - a.record : a.record - b.record
        )
        setUsersData(data.results)
      } else {
        setUsersData([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    void fetchUsersData()
    console.log(usersData)
  }, [])
  useEffect(() => {
    void fetchUsersData()
    console.log(sortOption)
  }, [sortOption])
  return (
    <main className='container pt-5'>
      <section className='mt-5 block h-full max-h-[450px] flex-1 overflow-y-auto bg-white p-7'>
        <div className='flex justify-between pl-8 pr-6'>
          <h1 className=' text-3xl'>Leaders</h1>
          <select
            name='test'
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value='Aim Trainer'>Aim Trainer</option>
            <option value='Reaction Time'>Reaction Time</option>
            <option value='Sequence Memory'>Sequence Memory</option>
          </select>
        </div>
        <div className='w-full'>
          <div className=''>
            {usersData.map((user, index) => {
              return (
                <div
                  className='flex h-20 items-center justify-between py-3 pl-8 pr-6'
                  key={index}
                >
                  <span className=' w-10 text-center font-bold'>
                    {index + 1}
                  </span>
                  <img
                    src={user.userImage}
                    alt='user'
                    className=' ml-3 mr-12 h-12 w-12 rounded-3xl'
                  />
                  <span className=' flex-grow overflow-hidden text-left text-xl font-bold'>
                    {user.userName}
                  </span>
                  <span className=' mr-3 flex-grow text-right text-xl font-bold '>
                    {user.record}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default LeaderBoard
