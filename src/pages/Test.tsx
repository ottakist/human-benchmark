import React, { Suspense, useEffect, useState } from 'react'
import { Loading, PageHero, TestInfoSection } from '../components'
import { BsLightningFill } from 'react-icons/bs'
import { type Params, useParams, useNavigate } from 'react-router-dom'
import { games } from '../utils/games'
import { type GameProps } from '../common/testTypes'

const Test = () => {
  const { testName }: Readonly<Params<string>> = useParams()
  const [gameStart, setGameStart] = useState(false)
  const navigate = useNavigate()
  const [gameStatus, setGameStatus] = useState({
    isReady: false,
    showResult: false,
    icon: [BsLightningFill],
    action: () => {},
    button: () => {},
    title: '',
    subtitle: '',
    background: ''
  })
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null
  )

  function loadComponent(name: string) {
    const DynamicComponent = React.lazy(async () => {
      const module = await import(`../components/tests/${name}.tsx`)
      return { default: module.default }
    })
    setComponent(() => DynamicComponent)
  }

  useEffect(() => {
    loadComponent(
      testName
        ? testName.charAt(0).toUpperCase() + testName.slice(1)
        : 'Reaction'
    )
  }, [testName])
  const { icon, title, subtitle, about, chart }: GameProps = games.find(
    (game) => game.title.split(' ')[0].toLowerCase() === testName
  ) ?? { icon: BsLightningFill, title: '', subtitle: '', about: [], chart: '' }

  return (
    <>
      {gameStart ? (
        gameStatus.showResult ? (
          <PageHero
            background={gameStatus.background}
            icon={gameStatus.icon}
            title={gameStatus.title}
            subString={gameStatus.subtitle}
            action={() => {}}
            button={() => {
              setGameStatus({ ...gameStatus, showResult: false })
            }}
            secondBtn={() => navigate('/dashboard')}
          />
        ) : (
          <Suspense fallback={<Loading />}>
            {Component && (
              <Component
                setGameStatus={setGameStatus}
                gameStatus={gameStatus}
              />
            )}
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
          secondBtn={undefined}
        />
      )}
      <TestInfoSection about={about} chart={chart} />
    </>
  )
}

export default Test
