import useTimePassed from '../hooks/useTimePassed'
const DashUser = ({ name, createdAt }: { name: string; createdAt: number }) => {
  const timePassed = useTimePassed(createdAt)

  return (
    <section className='bg-white p-7 pt-5'>
      <div className='flex flex-col font-sans text-xl text-text_black'>
        User <div className=' text-4xl font-bold opacity-100'>{name}</div>
      </div>
      <div className='flex flex-col font-sans text-xl text-text_black'>
        Joined{' '}
        <div className=' text-md font-bold opacity-100'>{timePassed}</div>
      </div>
    </section>
  )
}

export default DashUser
