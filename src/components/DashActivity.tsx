import useTimePassed from '../hooks/useTimePassed'
const DashActivity = ({
  testData
}: {
  testData: Array<{
    testName: string
    score: string[]
    date: number[]
    percentile: number
  }>
}) => {
  const calculateDelay = (time: number) => useTimePassed(time)
  return (
    <section className='mt-5 block h-full max-h-[450px] flex-1 overflow-y-auto bg-white p-7'>
      <h1 className=' text-3xl'>Activity feed</h1>
      <table className='table w-full table-fixed'>
        <thead>
          <tr>
            <th className='table-cell p-3 text-left font-sans text-xl text-text_black'>
              Test
            </th>
            <th className='table-cell p-3 text-center font-sans text-xl text-text_black'>
              Date
            </th>
            <th className='table-cell p-3 text-right font-sans text-xl text-text_black'>
              Score
            </th>
          </tr>
        </thead>
        <tbody className=''>
          {testData
            // customizing array first
            ?.flatMap((test: any) => {
              const attempts = test.date.length
              return Array.from({ length: attempts }, (_, index) => ({
                ...test,
                score: [test.score[index]],
                date: [test.date[index]]
              }))
            })
            // sorting array for newest update in db
            .sort((a: any, b: any) => b.date[0] - a.date[0])
            // mapping over array
            .map((test: any, index: number) => (
              <tr className='table-row odd:bg-background-gray-250' key={index}>
                <td className='p-3 text-left font-sans text-xl font-bold text-text_black'>
                  {test.testName}
                </td>
                <td className='p-3 text-center font-sans text-xl'>
                  {test.date.map((date: number, dateIndex: number) => (
                    <div className='flex flex-col' key={dateIndex}>
                      <span>{calculateDelay(date)}</span>
                      <span className='text-gray-400'>
                        {new Date(date).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </td>
                <td className='p-3 text-right font-sans text-xl text-text_black'>
                  {test.score.map((score: string, scoreIndex: number) => (
                    <div key={scoreIndex}>{score}</div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )
}

export default DashActivity
