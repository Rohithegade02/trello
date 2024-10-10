import { LoginUser, User } from '../interfaces'

const baseUrl = 'http://localhost:3000/api'

//sign in user
export async function signInUser(data: User) {
  try {
    const response = await fetch(`${baseUrl}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    // localStorage.setItem('token', result.token)
    return result
  } catch (error) {
    console.error('Error:', error)
  }
}

// login user
export async function loginUser(data: LoginUser) {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error:', error)
  }
}
