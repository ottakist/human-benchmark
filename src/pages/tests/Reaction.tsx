/* eslint-disable multiline-ternary */
import { useRef, useState } from 'react'
import { PageHero } from '../../components'
import { IoAlertCircle } from 'react-icons/io5'
import { ImClock2 } from 'react-icons/im'
const Reaction = () => {
  const [gameStart, setGameStart] = useState(false)
  const startTime = useRef<number>(0)
  const stopTime = useRef<number>(0)
  const refId = useRef<number>(0)
  const [gameStatus, setGameStatus] = useState({
    isReady: false,
    isStarted: false,
    gameMessage: ['Wait for green...', '', `{'\u25CF'}{'\u25CF'}{'\u25CF'}`],
    gameBackground: 'bg-red-600'
  })
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const getStartTime = (): Promise<number> => {
    const rnd = Math.random() * 5 * 1000
    setGameStatus({
      isReady: false,
      isStarted: true,
      gameMessage: ['Wait for green...', '', `\u25CF\u25CF\u25CF`],
      gameBackground: 'bg-red-600'
    })
    return new Promise((resolve) => {
      refId.current = setTimeout(() => {
        const time = new Date().getTime()
        resolve(time)
      }, rnd)
    })
  }

  async function startClick() {
    startTime.current = await getStartTime()
    setGameStatus({
      isReady: true,
      isStarted: true,
      gameMessage: ['Click!', '', `\u25CF\u25CF\u25CF`],
      gameBackground: 'bg-background-green'
    })
  }
  function endClick() {
    stopTime.current = new Date().getTime()
    if (!gameStatus.isReady) {
      clearInterval(refId.current)
      setGameStatus({
        isReady: false,
        isStarted: false,
        gameMessage: [
          'Too soon!',
          'Click to try again',
          `Alert`
        ],
        gameBackground: 'bg-background-blue-500'
      })
    } else {
      setGameStatus({
        isReady: false,
        isStarted: false,
        gameMessage: [
          `${(stopTime.current - startTime.current).toString()} ms`,
          'Click to keep going',
          'Clock'
        ],
        gameBackground: 'bg-background-blue-500'
      })
    }
  }
  const handleClick = !gameStatus.isStarted ? startClick : endClick
  return (
    <>
      {gameStart ? (
        <main
          onClick={() => {
            handleClick()
          }}
          className={`flex h-[540px] cursor-pointer select-none flex-col  justify-center overflow-hidden ${gameStatus.gameBackground}  p-5 text-center text-white`}
        >
          <div className='container tablet:px-[20px]'>
            <div className='mt-[30px] font-normal'>
              <h1 className=' text-[42px] tablet:text-[80px] '>
                {gameStatus.gameMessage[2] === 'Alert' ? (
                  <IoAlertCircle className='mx-auto' />
                ) : gameStatus.gameMessage[2] === 'Clock' ? (
                  <ImClock2 className='mx-auto' />
                ) : (
                  gameStatus.gameMessage[2]
                )}
              </h1>
              <h1 className=' text-[42px] tablet:text-[80px] '>
                {gameStatus.gameMessage[0]}
              </h1>
              <h2 className='text-[28px] tablet:text-[24px]'>
                {gameStatus.gameMessage[1]}
              </h2>
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
            title='Human benchmark'
            subtitle='When the red box turns green, click as quickly as you can.'
            buttonShow={false}
          />
        </div>
      )}
    </>
  )
}

export default Reaction
