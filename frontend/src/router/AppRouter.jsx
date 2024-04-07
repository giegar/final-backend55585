import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginView } from '../views/LoginView'
import { RegisterView } from '../views/RegisterView'
import { HomeView } from '../views/HomeView'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/auth/login' element={<LoginView/>}/>
            <Route path='/auth/register' element={<RegisterView/>}/>
            <Route path='/' element={<HomeView/>}/>

            <Route path='/*' element={<Navigate to='/'/>}/>
        </Routes>
    )
}