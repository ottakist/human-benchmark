import React, { Suspense, useState } from 'react'
import { Loading, PageHero, TestInfoSection } from '../components'
import { BsLightningFill } from 'react-icons/bs'
import { type Params, useParams } from 'react-router-dom'
import { games } from '../utils/games'
import { type IconType } from 'react-icons'
function loadComponent(name: string) {
  const Component = React.lazy(async () => await import(`./tests/${name}.tsx`))
  return Component
}
interface GameProps {
  icon: IconType
  title: string
  subtitle: string
  about: string[]
}
const Test = () => {
  const [gameStart, setGameStart] = useState(false)
  const [gameStatus, setGameStatus] = useState({
    isReady: false,
    showResult: false,
    action: () => {},
    button: () => {},
    title: 'sequence memory',
    subtitle: 'Remember an increasingly long pattern of button presses.',
    background: 'bg-background-blue-200'
  })
  const { testName }: Readonly<Params<string>> = useParams()
  const Component = loadComponent(
    testName ? testName.charAt(0).toUpperCase() + testName.slice(1) : 'Reaction'
  )
  const { icon, title, subtitle, about }: GameProps = games.find(
    (game) => game.title.split(' ')[0].toLowerCase() === testName
  ) ?? { icon: BsLightningFill, title: '', subtitle: '', about: [] }

  return (
    <>
      {gameStart ? (
        gameStatus.showResult ? (
          <PageHero
            background={gameStatus.background}
            icon={[BsLightningFill]}
            title={gameStatus.title}
            subString={gameStatus.subtitle}
            action={() => {}}
            button={() => {
              setGameStatus({ ...gameStatus, showResult: false })
            }}
          />
        ) : (
          <Suspense fallback={<Loading />}>
            <Component setGameStatus={setGameStatus} />
          </Suspense>
        )
      ) : (
        <PageHero
          icon={[icon]}
          title={title}
          subString={subtitle}
          action={null}
          button={() => {
            setGameStart(true)
          }}
          background='bg-background-blue-200'
        />
      )}
      <TestInfoSection about={about} data={[]} />
    </>
  )
}

export default Test
