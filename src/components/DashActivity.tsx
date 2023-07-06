import useTimePassed from '../hooks/useTimePassed'

const options: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
}
const DashActivity = ({
  testData
}: {
  testData: Array<{
    testName: string
    score: string[]
    date: number
  }>
}) => {
  return (
    <section className='mt-5 block flex-1 bg-white p-7'>
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
            ?.sort((a, b) => b.date - a.date)
            .map((data, index) => {
              const timePassed = useTimePassed(data.date)
              return (
                <tr
                  className=' table-row odd:bg-background-gray-250'
                  key={index}
                >
                  <td className='p-3 text-left font-sans text-xl font-bold text-text_black'>
                    {data.testName}
                  </td>
                  <td className='flex flex-col p-3 text-center font-sans text-xl'>
                    <span>{timePassed}</span>
                    <span className=' text-gray-400'>
                      {new Date(data.date).toLocaleString('en-US', options)}
                    </span>
                  </td>
                  <td className='p-3 text-right font-sans text-xl text-sky-500'>
                    {data.score}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </section>
  )
}

export default DashActivity
