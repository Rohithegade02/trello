import { signInUser } from '../../api/user'
import { useState } from 'react'
import { User } from '../../interfaces'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

const Signup = () => {
  const { signUp } = useAuth()
  const [user, setUser] = useState<User>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    picture: '',
  })

  const [errors, setErrors] = useState<{
    firstname?: string
    lastname?: string
    email?: string
    password?: string
    confirmPassword?: string
    server?: string
  }>({})

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async tokenResponse => {
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
        await signInUser({
          email: userProfile.email,
          firstname: userProfile.given_name,
          lastname: userProfile.family_name,
          confirmPassword: '',
          password: '',
          picture: userProfile.picture,
        })
        toast.success(`Google Sign in Successfully`)
        signUp()
        localStorage.setItem('picture', userProfile.picture)
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
  const navigate = useNavigate()
  const handleSignUp = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setErrors({})

    let validationErrors = {}
    if (!user.firstname) {
      validationErrors = {
        ...validationErrors,
        firstname: 'First Name is required',
      }
    }
    if (!user.lastname) {
      validationErrors = {
        ...validationErrors,
        lastname: 'Last Name is required',
      }
    }
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
    if (user.password !== user.confirmPassword) {
      validationErrors = {
        ...validationErrors,
        confirmPassword: 'Passwords do not match',
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const res = await signInUser(user)
      if (res.success) {
        toast.success(res.message)
        signUp()
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
      setErrors({ server: 'Sign-up failed. Please try again later.' })
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
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.firstname ? 'border-red-500' : 'border-blue-300'
              }`}
            />
            {errors.firstname && (
              <p className='text-red-500 text-sm'>{errors.firstname}</p>
            )}

            <input
              type='text'
              placeholder='Last Name'
              value={user.lastname}
              onChange={e => setUser({ ...user, lastname: e.target.value })}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.lastname ? 'border-red-500' : 'border-blue-300'
              }`}
            />
            {errors.lastname && (
              <p className='text-red-500 text-sm'>{errors.lastname}</p>
            )}

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

            <input
              type='password'
              placeholder='Confirm Password'
              value={user.confirmPassword}
              onChange={e =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.confirmPassword ? 'border-red-500' : 'border-blue-300'
              }`}
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>
            )}

            {errors.server && (
              <p className='text-red-500 text-sm'>{errors.server}</p>
            )}

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
              Already have an account?
              <span
                onClick={() => navigate('/login')}
                className='text-blue-500 cursor-pointer font-semibold hover:underline'
              >
                {' '}
                Login
              </span>
            </p>
          </div>

          <div className='flex w-full items-center justify-center'>
            <button
              onClick={() => handleGoogleSignIn()}
              className='w-[50%] py-2 bg-blue-500 border font-medium text-white border-blue-500 hover:bg-blue-700 rounded-md'
            >
              Signup with <span className='font-bold'> Google</span>
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Signup
