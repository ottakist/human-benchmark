/* eslint-disable multiline-ternary */
import { useRef, useState } from 'react'
import { PageHero } from '../../components'
const Reaction = () => {
  const [gameStart, setGameStart] = useState(false)
  const startTime = useRef<number>(0)
  const stopTime = useRef<number>(0)
  const [gameStatus, setGameStatus] = useState({
    isStarted: false,
    gameMessage: 'Wait for green...',
    gameBackground: 'bg-red-600'
  })
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const getStartTime = (): Promise<number> => {
    const rnd = Math.random() * 5 * 1000
    return new Promise((resolve) => {
      setTimeout(() => {
        const time = new Date().getTime()
        resolve(time)
        stopTime.current = 0
      }, rnd)
    })
  }

  async function startClick() {
    startTime.current = await getStartTime()
    setGameStatus({
      isStarted: true,
      gameMessage: 'Click!',
      gameBackground: 'bg-background-green'
    })
    console.log(startTime.current)
  }

  return (
    <>
      {gameStart && gameStatus.isStarted ? (
        <main
          onClick={() => {
            stopTime.current = new Date().getTime()
            setGameStatus({
              isStarted: false,
              gameMessage: `${(
                stopTime.current - startTime.current
              ).toString()} ms`,
              gameBackground: 'bg-background-blue-500'
            })
          }}
          className={`flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden ${gameStatus.gameBackground}  p-5 text-center text-white`}
        >
          <div className='container tablet:px-[20px]'>
            <div className='mt-[30px] font-normal'>
              <h1 className=' text-[42px] tablet:text-[80px] '>
                {'\u25CF'}
                {'\u25CF'}
                {'\u25CF'}
              </h1>
              <h1 className=' text-[42px] tablet:text-[80px] '>
                {gameStatus.gameMessage}
              </h1>
              <h2 className='text-[28px] tablet:text-[24px]'></h2>
            </div>
          </div>
        </main>
      ) : (
        <div
          onClick={() => {
            setGameStart(true)
            void startClick()
          }}
        >
          <PageHero
            title='human benchmark'
            subtitle='When the red box turns green, click as quickly as you can.'
            buttonShow={false}
          />
        </div>
      )}
    </>
  )
}

export default Reaction
