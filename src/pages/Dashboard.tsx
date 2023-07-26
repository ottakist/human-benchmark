import { useAuth0 } from '@auth0/auth0-react'
import { DashActivity, DashStats, DashUser } from '../components'
import { useEffect, useState } from 'react'
import { getUserById } from '../firebase/functions'
import { type TestType } from '../common/dashTypes'
import { useLocation } from 'react-router-dom'
const Dashboard = () => {
  const { user } = useAuth0()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userId = searchParams.get('userId')
  const [userData, setUserData] = useState<{ name: string; createdAt: number }>(
    {
      name: 'Guest',
      createdAt: new Date().getTime()
    }
  )
  const [testData, setTestData] = useState<TestType[]>([])
  useEffect(() => {
    const fetchUserData = async () => {
      const userLink = userId ?? user?.sub ?? '1'
      const userById = await getUserById(userLink)
      if (userById) {
        setTestData(userById?.testData)
        setUserData({
          name: userById.name,
          createdAt: userById?.createdAt?.toDate().getTime()
        })
      } else {
        console.log('User not found')
      }
    }

    void fetchUserData()
  }, [user, userId])
  return (
    <main className='container pt-5'>
      <DashUser {...userData} />
      <DashStats testData={testData} />
      <DashActivity testData={testData} />
    </main>
  )
}
export default Dashboard
