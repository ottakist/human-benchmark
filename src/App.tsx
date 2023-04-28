import { Navbar, Sidebar } from './components'
import { Home, Error, Dashboard } from './pages'
import { Reaction, Sequence } from './pages/tests'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tests/reaction' element={<Reaction />} />
          <Route path='/tests/sequence' element={<Sequence />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
