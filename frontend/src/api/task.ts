import { Task } from '../interfaces'

const baseUrl = 'http://localhost:3000/task'

//create a new task
export async function createTask(data: Task) {
  try {
    const response = await fetch(`${baseUrl}/`, {
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

// get ALl Task
export async function getAllTask() {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error:', error)
  }
}
//update Task
export async function updateTask(id: Task['_id'], data: Task) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
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
//update Task
export async function deleteTask(id: Task['_id']) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error:', error)
  }
}
