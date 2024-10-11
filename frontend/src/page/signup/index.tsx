import { signInUser } from '../../api/user'
import { useState } from 'react'
import { User } from '../../interfaces'

const Signup = () => {
  const [user, setUser] = useState<User>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const handleGoogleSignIn = async () => {}
  const handleSignUp = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    try {
      await signInUser(user) // Passing the entire user object to the signInUser function
      console.log('User signed up successfully')
    } catch (error) {
      console.error('Sign-up failed:', error)
    }
  }

  return (
    <div className='h-[90vh] flex flex-col justify-center items-center gap-5 bg-white'>
      <div className='flex w-full max-w-md items-start justify-start'>
        <h1 className='text-3xl font-bold text-blue-600'>Signup</h1>
      </div>
      <div className='w-full max-w-md p-8 space-y-6 bg-white border-2 border-blue-500 rounded-lg shadow-md'>
        <div className='space-y-4'>
          <form onSubmit={handleSignUp} className='space-y-2'>
            <input
              type='text'
              placeholder='First Name'
              value={user.firstname}
              onChange={e => setUser({ ...user, firstname: e.target.value })}
              className='w-full px-4 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none'
            />
            <input
              type='text'
              placeholder='Last Name'
              value={user.lastname}
              onChange={e => setUser({ ...user, lastname: e.target.value })}
              className='w-full px-4 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none'
            />
            <input
              type='email'
              placeholder='Email'
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              className='w-full px-4 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none'
            />
            <input
              type='password'
              value={user.password}
              placeholder='Password'
              onChange={e => setUser({ ...user, password: e.target.value })}
              className='w-full px-4 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none'
            />
            <input
              type='password'
              placeholder='Confirm Password'
              value={user.confirmPassword}
              onChange={e =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className='w-full px-4 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none'
            />
            <button
              type='submit'
              className='w-full py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-md'
            >
              Signup
            </button>
          </form>

          {/* Other options */}
          <div className='text-center'>
            <p className='text-sm text-gray-500'>
              Already have an account?{' '}
              <a
                href='login'
                className='text-blue-500 font-semibold hover:underline'
              >
                Login
              </a>
            </p>
          </div>

          <div className='flex w-full items-center justify-center'>
            <button
              onClick={handleGoogleSignIn}
              className='w-[50%] py-2 bg-blue-500 border font-medium text-white border-blue-500 hover:bg-blue-700 rounded-md'
            >
              Signup with <span className='font-bold'> Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
