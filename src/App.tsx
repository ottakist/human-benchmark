import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
import PageHero from './components/PageHero'
import GamesTable from './components/GamesTable'
function App(): JSX.Element {
  return (
    <>
      {/* <Sidebar/> */}
      <Navbar />
      <PageHero />
      <GamesTable/>
    </>
  )
}

export default App
