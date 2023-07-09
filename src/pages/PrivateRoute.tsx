import type React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { PageHero } from '../components'
import { BiErrorAlt } from 'react-icons/bi'
const PrivateRoute = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()
  if (!isLoading && !isAuthenticated) {
    setTimeout(() => {
      navigate('/')
    }, 2000)
    return (
      <>
        <PageHero
          title={'Please login first'}
          icon={[BiErrorAlt]}
          background={'bg-background-blue-200'}
          subString={''}
          action={null}
          button={null}
          secondBtn={undefined}
        />
      </>
    )
  }
  return <>{children}</>
}
export default PrivateRoute
