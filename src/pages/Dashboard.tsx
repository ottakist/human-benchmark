import { useAuth0 } from '@auth0/auth0-react'
import { DashStats, DashUser } from '../components'
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
  return (
    <main className='container pt-5'>
      <DashUser user={user} />
      <DashStats testData={testData} />
    </main>
  )
}

export default Dashboard
