const DashStats = ({
  testData
}: {
  testData: Array<{
    test: string
    actions: string
    score: number[]
    percentile: number
  }>
}) => {
  return (
    <section className='mt-5 block flex-1 bg-white p-7'>
      <table className='table w-full'>
        <tbody className=' table-row-group align-middle'>
          <th className='table-cell p-3 text-left font-sans text-xl text-text_black'>
            Test
          </th>
          <th className='table-cell p-3 text-left font-sans text-xl text-text_black'>
            Actions
          </th>
          <th className='table-cell p-3 text-left font-sans text-xl text-text_black'>
            Score
          </th>
          <th className='table-cell p-3 text-left font-sans text-xl text-text_black'>
            Percentile
          </th>
          {testData.map((data, index) => (
            <tr className=' table-row odd:bg-background-gray-250' key={index}>
              <td className='p-3 font-sans text-xl font-bold text-text_black'>
                {data.test}
              </td>
              <td className='p-3 font-sans text-xl text-sky-500'>
                {data.actions}
              </td>
              <td className='p-3'>
                <div className='text-3xl  font-bold'>
                  {data.score[0].toString().split(' ')[0]}{' '}
                  <span className='text-base font-normal'>
                    {data.score[0].toString().split(' ')[1]}
                  </span>
                </div>
              </td>
              <td className='w-[200px] p-3 font-sans text-xl text-text_black'>
                <div className='flex h-[32px] w-full items-center bg-gray-300'>
                  <div
                    style={{ width: `${data.percentile}%` }}
                    className={`flex h-full flex-row items-center bg-blue-600`}
                  ></div>
                  {data.percentile}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default DashStats
