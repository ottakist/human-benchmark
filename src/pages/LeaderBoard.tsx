import { useEffect, useState } from 'react'
import { getUsersRatings } from '../firebase/functions/getUsersRating'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const LeaderBoard = () => {
  const { user } = useAuth0()
  const userId = user?.sub
  const [usersData, setUsersData] = useState<
    Array<{
      userName: string
      userImage: string
      record: number
      userId: string
    }>
  >([])
  const [sortOption, setSortOption] = useState('Aim Trainer')
  const fetchUsersData = async () => {
    try {
      const data = await getUsersRatings(sortOption)
      if (data?.results !== undefined) {
        setUsersData(
          data.results
            .sort((a, b) =>
              data.type !== 'reaction'
                ? b.record - a.record
                : a.record - b.record
            )
            .filter((data) => data.record !== 0)
        )
      } else {
        setUsersData([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    void fetchUsersData()
  }, [])
  useEffect(() => {
    void fetchUsersData()
  }, [sortOption])
  return (
    <main className='container pt-5'>
      <section className='mt-5 block h-full max-h-[450px] flex-1 overflow-y-auto bg-white py-7 tablet:px-7'>
        <div className='flex justify-between pl-8 pr-6'>
          <h1 className=' text-3xl'>Leaders</h1>
          <div className='relative '>
            <label
              htmlFor='test'
              className='absolute -top-5 w-full text-center'
            >
              Select a test:
            </label>
            <select
              className='w-fit appearance-none rounded-md  border border-gray-300 bg-white px-4 py-2 text-center text-base shadow-sm duration-200  focus:border-2 focus:border-background-blue-500 focus:outline-none '
              name='test'
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value='Aim Trainer'>Aim Trainer</option>
              <option value='Reaction Time'>Reaction Time</option>
              <option value='Sequence Memory'>Sequence Memory</option>
            </select>
          </div>
        </div>
        <div className='w-full'>
          <div className=''>
            {usersData.map((user, index) => {
              return (
                <Link
                  to={`/dashboard?userId=${user.userId}`}
                  className={`mt-2 flex h-20 flex-grow items-center justify-between rounded-md border-2 border-black px-6 py-3 ${
                    user.userId === userId
                      ? 'bg-gray-400 bg-opacity-40'
                      : 'bg-opacity-50 hover:bg-gray-100'
                  }`}
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
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default LeaderBoard
