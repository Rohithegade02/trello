const Login = () => {
  return (
    <div className='h-[90vh] flex flex-col justify-center items-center gap-5  bg-white'>
      <div className='flex w-full max-w-md items-start justify-start '>
        {' '}
        <h1 className='text-3xl  font-bold text-blue-600'>Login</h1>
      </div>
      <div className='w-full max-w-md p-8 space-y-6 bg-white border-2  border-blue-500 rounded-lg shadow-md'>
        <div className='space-y-4'>
          <div className='space-y-2'>
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
          </div>
          <button className='w-full py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md'>
            Login
          </button>

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
            <button className='w-[50%]  py-2 bg-blue-500  border font-medium text-white border-blue-500 hover:bg-blue-700 rounded-md'>
              Login with <span className='font-bold'> Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
