import { useAuth0 } from '@auth0/auth0-react'
import { DashActivity, DashStats, DashUser } from '../components'
import { useEffect, useState } from 'react'
import { getUserById } from '../firebase/functions'
import { type TestType } from '../common/dashTypes'
const Dashboard = () => {
  const { user } = useAuth0()
  const [userData, setUserData] = useState<{ name: string; createdAt: number }>(
    {
      name: 'Guest',
      createdAt: new Date().getTime()
    }
  )
  const [testData, setTestData] = useState<TestType[]>([])
  useEffect(() => {
    const fetchUserData = async () => {
      const userById = await getUserById(user?.sub ?? '1')
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
  }, [user])
  return (
    <main className='container pt-5'>
      <DashUser {...userData} />
      <DashStats testData={testData} />
      <DashActivity testData={testData} />
    </main>
  )
}
export default Dashboard
