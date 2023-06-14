import { BsFillSquareFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { type IconType } from 'react-icons'
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
interface TestProps {
  setGameStatus: React.Dispatch<
    React.SetStateAction<{
      isReady: boolean
      showResult: boolean
      title: string
      subtitle: string
      background: string
      icon?: IconType[]
      action?: () => void
      button?: () => void
    }>
  >
  gameStatus: {
    isReady: boolean
    showResult: boolean
    title: string
    subtitle: string
    icon: IconType[]
    action: () => void
    button: () => void
    background: string
  }
}
const Sequence = ({ setGameStatus, gameStatus }: TestProps) => {
  const [sequence, setSequence] = useState<number[]>([])
  const [rounds, setRounds] = useState<number>(0)
  const [sequenceClick, setSequenceClick] = useState<number>(0)
  const [squareIndex, setSquareIndex] = useState<number>(0)
  useEffect(() => {
    setGameStatus((prevGameStatus) => ({ ...prevGameStatus, isReady: false }))
    if (sequence.length > 0) {
      const id = setTimeout(() => {
        iterateWithDelay(sequence)
      }, 1000)
      return () => clearTimeout(id)
    }
  }, [sequence])
  useEffect(() => {
    generateSequence(rounds)
    setSequenceClick(0)
  }, [rounds])
  useEffect(() => {
    setRounds(1)
  }, [])
  function generateSequence(amount: number) {
    setSequence((prevSequence) => {
      const newSequence = [...prevSequence]
      while (newSequence.length < amount) {
        const num = Math.floor(Math.random() * 9) + 1
        newSequence[newSequence.length - 1] !== num && newSequence.push(num)
      }
      return newSequence
    })
  }
  function iterateWithDelay(array: number[]) {
    setGameStatus((prevGameStatus) => ({ ...prevGameStatus, isReady: false }))
    array.forEach((num, i) => {
      const timeoutId = setTimeout(() => {
        triggerBtn(num)
        if (i === array.length - 1) {
          clearTimeout(timeoutId)
          setGameStatus((prevGameStatus) => ({
            ...prevGameStatus,
            isReady: true
          }))
        }
      }, i * 800)
    })
  }

  function sequenceMatching(clickIndex: number, buttonIndex: number) {
    if (buttonIndex === sequence[clickIndex]) {
      if (clickIndex === sequence.length - 1) {
        setRounds((prev) => (prev += 1))
        const id = setTimeout(() => {
          setGameStatus((prevGameStatus) => ({
            ...prevGameStatus,
            background:
              'transition-background duration-300 ease-linear bg-background-blue-70 '
          }))
        }, 200)
        return () => {
          clearTimeout(id)
        }
      }
    } else {
      setGameStatus((prevGameStatus) => ({
        ...prevGameStatus,
        isReady: false,
        showResult: true,
        title: `Level ${rounds}`,
        background: 'bg-background-blue-200',
        subtitle: 'Click button to restart'
      }))
      setSequence([])
    }
  }
  function triggerBtn(id: number) {
    setSquareIndex(id)
    const timeoutId = setTimeout(() => {
      setSquareIndex(0)
    }, 300)
    return () => clearTimeout(timeoutId)
  }
  return (
    <>
      <main
        className={` flex h-[540px] select-none flex-col  justify-center overflow-hidden bg-background-blue-200 p-5 text-center text-white transition-colors duration-300 ease-linear`}
      >
        <div className='container tablet:px-[20px]'>
          <h2 className='text-[28px] tablet:text-[24px]'>Level: {rounds}</h2>
          <div className='mt-7 select-none'>
            {arr.map((col, index) => (
              <div key={index} className='flex justify-center'>
                {col.map((square) => {
                  return (
                    <BsFillSquareFill
                      onClick={() => {
                        triggerBtn(square)
                        if (gameStatus.isReady && sequence.length !== 0) {
                          setSequenceClick((prev) => prev + 1)
                          sequenceMatching(sequenceClick, square)
                        }
                      }}
                      key={square}
                      className={` cursor-pointer  p-2 ${
                        square === squareIndex
                          ? 'scale-100  fill-white opacity-100 transition-all duration-[50] ease-out '
                          : ' scale-100 fill-fill_blue_dark opacity-20  transition-all duration-[50] ease-out'
                      }`}
                      size={132}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Sequence
