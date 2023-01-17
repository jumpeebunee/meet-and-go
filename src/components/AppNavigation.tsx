import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import MainPage from '../pages/MainPage'

const AppNavigation = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/register' element={<RegisterPage/>}></Route>
      <Route path='/' element={<MainPage/>}></Route>
    </Routes>
  )
}

export default AppNavigation