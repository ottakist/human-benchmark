import { redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { PageHero } from '../components'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth0()

  if (!isAuthenticated) {
    return (
      <>
        <PageHero
          title={'Please login first'}
          icon={[]}
          background={'bg-background-blue-200'}
          subString={''}
          action={null}
          button={() => redirect('/')}
        />
      </>
    )
  }
  return children
}
export default PrivateRoute
