import { Navbar, Sidebar } from './components'
import PrivateRoute from './pages/PrivateRoute'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { createUser } from './firebase/functions'
import { useEffect, Suspense, lazy } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
function App(): JSX.Element {
  const Error = lazy(async () => await import('./pages/Error'))
  const Dashboard = lazy(async () => await import('./pages/Dashboard'))
  const Test = lazy(async () => await import('./pages/Test'))
  const Home = lazy(async () => await import('./pages/Home'))
  const LeaderBoard = lazy(async () => await import('./pages/LeaderBoard'))
  const { user } = useAuth0()
  useEffect(() => {
    if (user?.sub && user.name && user.nickname && user.email && user.picture) {
      void createUser(
        user.sub,
        user.name ?? user?.nickname,
        user.email,
        user.picture
      )
    }
  }, [user])
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tests/:testName' element={<Test />} />
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/leaderboard'
              element={
                <PrivateRoute>
                  <LeaderBoard />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
