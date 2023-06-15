import { Navbar, Sidebar } from './components'
import { Home, Error, Dashboard } from './pages'
import Test from './pages/Test'
// import { Aim, Reaction, Sequence } from './pages/tests'
import PrivateRoute from './pages/PrivateRoute'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tests/:testName' element={<Test />} />
          {/* <Route path='/tests/reaction' element={<Reaction />} />
          <Route path='/tests/sequence' element={<Sequence />} />
          <Route path='/tests/aim' element={<Aim />} /> */}
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
