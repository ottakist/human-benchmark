import { Link } from 'react-router-dom'
import { BsInfoCircleFill } from 'react-icons/bs'
import { calculatePercentageImprovement } from '../../firebase/functions'
import { useEffect, useState } from 'react'
import { type TestType } from '../../common/dashTypes'
const DashStats = ({
  testData
}: {
  testData: TestType[]
}) => {
  const calculateUserAverage = (arr: {
    testName: string
    score: string[]
  }): number => {
    return Math.floor(
      arr.score
        .map((score) => parseInt(score, 10))
        .reduce((acc, cur) => acc + cur, 0) / arr.score.length
    )
  }
  return (
    <section className='mt-5 block flex-1 bg-white p-2 tablet:p-7'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th className='table-cell p-3 text-left font-sans text-xl text-text_black'>
              Test
            </th>
            <th className='table-cell p-3 text-left font-sans text-xl text-text_black'>
              Actions
            </th>
            <th className='flex items-center p-3 text-left font-sans text-xl text-text_black'>
              Score
              <BsInfoCircleFill
                className=' ml-1 fill-gray-300'
                title='Scores are calculated from the last 5 tests.'
              />
            </th>
            <th className='table-cell p-3 text-left font-sans text-xl text-text_black'>
              Percentile
            </th>
          </tr>
        </thead>
        <tbody className=' table-row-group align-middle'>
          {testData?.map((data, index) => {
            const [percentageImprovement, setPercentageImprovement] = useState<
              number | null
            >(null)

            useEffect(() => {
              void calculatePercentageImprovement(
                calculateUserAverage(data),
                data.testName
              ).then((result) => {
                if (data.score.length < 5) return 0
                return setPercentageImprovement(result / 10)
              })
            }, [data])
            return (
              <tr className=' table-row odd:bg-background-gray-250' key={index}>
                <td className='p-3 font-sans text-xl font-bold text-text_black'>
                  {data.testName}
                </td>
                <td className='p-3 font-sans text-xl text-sky-500'>
                  <Link
                    to={`/tests/${data.testName.split(' ')[0].toLowerCase()}`}
                  >
                    Play
                  </Link>
                </td>
                <td className='p-3'>
                  <div className='text-4xl font-bold'>
                    {data.score.length >= 5 ? (
                      <>
                        <span>{calculateUserAverage(data)}</span>
                        <span className='text-base font-normal'>
                          {data.score[0].toString().split(' ')[1]}
                        </span>
                      </>
                    ) : (
                      '?'
                    )}
                  </div>
                </td>
                <td className=' w-[200px] p-3 font-sans text-xl font-bold text-text_black'>
                  <div className=' relative flex h-[32px] w-full items-center bg-gray-300 text-center'>
                    <div
                      style={{
                        width: `${percentageImprovement ?? 0}%`
                      }}
                      className={`flex h-full flex-row items-center bg-blue-600`}
                    >
                      <span
                        className={`${
                          percentageImprovement ?? 0 >= 400
                            ? 'absolute w-full text-white'
                            : ''
                        }`}
                      >
                        {percentageImprovement === null
                          ? '?'
                          : `${percentageImprovement}%`}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default DashStats
