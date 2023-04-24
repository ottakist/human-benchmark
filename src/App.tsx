import { Navbar, Sidebar } from './components'
import { Home, Error } from './pages'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
