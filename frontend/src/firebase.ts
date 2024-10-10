// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA7z4c1Y-RczxJH5zoAJReCbYke_MvG6s0',
  authDomain: 'trello-assignment.firebaseapp.com',
  projectId: 'trello-assignment',
  storageBucket: 'trello-assignment.appspot.com',
  messagingSenderId: '155472211468',
  appId: '1:155472211468:web:b28aedc25b5884785e8829',
  measurementId: 'G-7DZTVN33V4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app) // Initialize authentication

export { app, analytics, auth }
