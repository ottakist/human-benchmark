import { useAuth0 } from '@auth0/auth0-react'
import { DashStats, DashUser } from '../components'
import { useEffect, useState } from 'react'
import { getUserById } from '../firebase'
// database awaited
const testData: Array<{
  test: string
  actions: string
  score: string
  percentile: number
}> = [
  {
    test: 'Sequence Memory',
    actions: 'Stats',
    score: '9.0 points',
    percentile: 38.8
  },
  {
    test: 'Aim Trainer',
    actions: 'Stats',
    score: '490 ms',
    percentile: 38.5
  },
  {
    test: 'Reaction Time',
    actions: 'Stats',
    score: '246 ms',
    percentile: 32.5
  }
]
const Dashboard = () => {
  const { user } = useAuth0()
  const [userData, setUserData] = useState({
    name: '',
    createdAt: 0
  })
  useEffect(() => {
    const fetchUserData = async () => {
      const userById = await getUserById(user?.sub ?? '1')
      if (userById) {
        setUserData({
          name: userById.name,
          createdAt: userById?.createdAt?.toDate().getTime()
        })
      } else {
        console.log('User not found')
      }
    }

    void fetchUserData()
    console.log('in dash', userData.createdAt)
  }, [user])
  return (
    <main className='container pt-5'>
      <DashUser {...userData} />
      <DashStats testData={testData} />
    </main>
  )
}

export default Dashboard
