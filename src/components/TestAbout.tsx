interface props {
  paragraphs: string[] | undefined
}
const TestAbout = ({ paragraphs }: props) => {
  return (
    <aside className='rounded-md bg-white p-8 shadow-md'>
      <h2 className=' text-[27px] font-bold'>About the test</h2>
      {paragraphs?.map((p, index) => {
        return (
          <p className='my-4 text-[18px]' key={index}>
            {p}
          </p>
        )
      })}
    </aside>
  )
}

export default TestAbout