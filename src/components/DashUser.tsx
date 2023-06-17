import { type User } from "@auth0/auth0-react"

const DashUser = ({ user }: { user?: User }) => {
  return (
    <section className='bg-white p-7 pt-5'>
      <div className='flex flex-col font-sans text-xl text-text_black'>
        User{' '}
        <div className=' text-4xl font-bold opacity-100'>
          {user?.name ?? user?.nickname}
        </div>
      </div>
      <div className='flex flex-col font-sans text-xl text-text_black'>
        Joined <div className=' text-4xl font-bold opacity-100'>Today</div>
      </div>
    </section>
  )
}

export default DashUser
