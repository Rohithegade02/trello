import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/login'
import Signup from './page/signup'
import HomePage from './page/home'
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProtectedRoute element={<HomePage />} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
