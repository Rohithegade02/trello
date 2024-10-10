import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'

const Signup = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log('User signed in successfully:', user)
    } catch (error) {
      console.error('Sign-in failed:', error)
    }
  }
  return (
    <div className='h-[90vh] flex flex-col justify-center items-center gap-5 bg-white'>
      <div className='flex w-full max-w-md items-start justify-start'>
        <h1 className='text-3xl font-bold text-blue-600'>Signup</h1>
      </div>
      <div className='w-full max-w-md p-8 space-y-6 bg-white border-2 border-blue-500 rounded-lg shadow-md'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <input
              type='text'
              placeholder='First Name'
              className='w-full px-4 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none'
            />
            <input
              type='text'
              placeholder='Last Name'
              className='w-full px-4 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none'
            />
            <input
              type='email'
              placeholder='Email'
              className='w-full px-4 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none'
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full px-4 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none'
            />
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full px-4 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none'
            />
          </div>
          <button className='w-full py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-md'>
            Signup
          </button>

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
