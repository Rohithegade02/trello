import { useState } from 'react'
import { loginUser } from '../../api/user'
import { useGoogleLogin } from '@react-oauth/google'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    server?: string
  }>({})
  const navigate = useNavigate()

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    // Reset previous errors
    setErrors({})

    // Client-side validation
    let validationErrors = {}
    if (!user.email) {
      validationErrors = { ...validationErrors, email: 'Email is required' }
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      validationErrors = { ...validationErrors, email: 'Invalid email format' }
    }

    if (!user.password) {
      validationErrors = {
        ...validationErrors,
        password: 'Password is required',
      }
    }

    // If there are validation errors, set them and return early
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Attempt server-side login
    try {
      const res = await loginUser(user)
      if (res.success) {
        toast.success(res.message)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      setErrors({ server: 'Failed to log in. Please check your credentials.' })
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      console.log(tokenResponse.access_token)
      try {
        const res = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        )

        const userProfile = await res.json()
        await loginUser({
          email: userProfile.email,
          password: '',
        })
        toast.success(`Logged Successfully`)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } catch (error) {
        console.error('Error fetching user profile:', error)
        toast.error('Failed to log in with Google.')
      }
    },
    onError: () => {
      toast.error('Google sign-in failed')
    },
  })

  return (
    <div className='h-[90vh] flex flex-col justify-center items-center gap-5 bg-white'>
      <div className='flex w-full max-w-md items-start justify-start '>
        <h1 className='text-3xl font-bold text-blue-600'>Login</h1>
      </div>
      <div className='w-full max-w-md p-8 space-y-6 bg-white border-2 border-blue-500 rounded-lg shadow-md'>
        <div className='space-y-4'>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-2'>
              <input
                type='email'
                placeholder='Email'
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.email ? 'border-red-500' : 'border-blue-300'
                }`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email}</p>
              )}

              <input
                type='password'
                placeholder='Password'
                value={user.password}
                onChange={e => setUser({ ...user, password: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.password ? 'border-red-500' : 'border-blue-300'
                }`}
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>{errors.password}</p>
              )}
            </div>

            {errors.server && (
              <p className='text-red-500 text-sm'>{errors.server}</p>
            )}

            <div>
              <button
                type='submit'
                className='w-full py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md'
              >
                Login
              </button>
            </div>
          </form>

          {/* Other options */}
          <div className='text-center'>
            <p className='text-sm text-gray-500'>
              Don't have an account?{' '}
              <a
                href='signup'
                className='text-blue-500 font-semibold hover:underline'
              >
                Signup
              </a>
            </p>
          </div>

          <div className='flex w-full items-center justify-center '>
            <button
              onClick={() => handleGoogleLogin()}
              className='w-[50%] py-2 bg-blue-500 border font-medium text-white border-blue-500 hover:bg-blue-700 rounded-md'
            >
              Login with <span className='font-bold'> Google</span>
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Login
