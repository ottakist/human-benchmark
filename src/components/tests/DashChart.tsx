const DashChart = ({ chart }: { chart: string }) => {
  return (
    <aside
      id='chart'
      className='h-full w-screen max-w-[420px] overflow-hidden bg-white pt-8 shadow-md tablet:rounded-md '
    >
      <h2 className='  pl-8 text-[27px] font-bold'>Statistics</h2>
      <img src={chart} alt='later with db' className='mx-auto w-[420px]' />
    </aside>
  )
}
export default DashChart
