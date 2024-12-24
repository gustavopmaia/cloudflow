import { Route, Routes } from 'react-router'
import LoginView from './views/Login'
import SignupView from './views/Signup'
import { DashboardView } from './views/Dashboard'

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardView />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='/signup' element={<SignupView />} />
    </Routes>
  )
}
