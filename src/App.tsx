import { Navbar, Sidebar } from './components'
import { Home, Error, Tests, Dashboard } from './pages'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tests' element={<Tests />}></Route>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
