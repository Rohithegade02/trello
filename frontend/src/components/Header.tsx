import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const pathName = useLocation()
  const router = useNavigate()
  return (
    <div className='flex justify-between items-center bg-blue-500 px-5 py-2'>
      <div className='text-blue-500'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M8 7V3m8 4V3M3 13h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2h-4l-2-2H9L7 5H5a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
      </div>
      {pathName.pathname === '/' ? (
        <div>
          {' '}
          <button
            className={`${
              pathName.pathname === '/'
                ? 'text-gray-300 rounded-sm bg-red-500'
                : 'text-white'
            } p-2 rounded-lg font-semibold`}
            onClick={() => {
              router('/login')
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className='space-x-4'>
          <button
            className={`${
              pathName.pathname === '/login'
                ? 'text-blue-500 rounded-lg bg-white'
                : 'text-white'
            } p-2 rounded-lg font-semibold`}
            onClick={() => {
              router('/login')
            }}
          >
            Login
          </button>
          <button
            className={`${
              pathName.pathname === '/signup'
                ? 'text-blue-500 rounded-lg bg-white'
                : 'text-white'
            } p-2 rounded-lg font-semibold`}
            onClick={() => {
              router('/signup')
            }}
          >
            Signup
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
