import { Navbar, Sidebar } from './components'
import { Home, Error, Dashboard } from './pages'
import Test from './pages/Test'
import PrivateRoute from './pages/PrivateRoute'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { createUser } from './firebase/functions'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
function App(): JSX.Element {
  const { user } = useAuth0()
  useEffect(() => {
    void createUser(user?.sub, user?.name ?? user?.nickname, user?.email)
  }, [user])

  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Navbar />
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
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
