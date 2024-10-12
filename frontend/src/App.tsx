import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/login'
import Header from './components/Header'
import Signup from './page/signup'
import HomePage from './page/home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
