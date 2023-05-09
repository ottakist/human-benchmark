/* eslint-disable multiline-ternary */
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, YAxis } from 'recharts'
interface chartData {
  data: Array<{ round: number; score: number; average: number }>
}
const DashChart = ({ data }: chartData) => {
  return (
    <aside className=' h-full rounded-md bg-white p-8 shadow-md'>
      <h2 className=' text-[27px] font-bold'>Statistics</h2>
      {data.length > 0 ? (
        <LineChart
          className='pt-6'
          width={420}
          height={330}
          data={data}
          margin={{ left: -20 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='round' />
          <YAxis />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='score'
            strokeWidth={2}
            stroke='#8884d8'
          />
          <Line
            name='average'
            type='monotone'
            dataKey='average'
            stroke='#ff0000'
            strokeWidth={3}
          />
        </LineChart>
      ) : (
        <>
          <LineChart
            className='pt-6'
            width={420}
            height={330}
            data={[
              { average: 273 },
              { average: 273 },
              { average: 273 },
              { average: 273 },
              { average: 273 }
            ]}
            margin={{ left: -20 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='round' />
            <YAxis />
            <Line
              name='average'
              type='monotone'
              dataKey='average'
              stroke='#ff0000'
              strokeWidth={3}
            />
          </LineChart>
        </>
      )}
    </aside>
  )
}

export default DashChart
