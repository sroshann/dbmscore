import { lazy, Suspense, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
// import { ProtectAuth } from './Middleware/ProtectRoutes'
import { useSelector } from 'react-redux'
import { useGetUserData } from './Hooks/auth.hook'
import { ProtectAdmin } from './Middleware/ProtectRoutes'

const Login = lazy( () => import('./Pages/Login') )
const Landing = lazy( () => import('./Pages/Landing') )
const Admin = lazy( () => import('./Pages/Admin') )
const AdminStdLst = lazy( () => import('./Pages/AdminStdLst') )

function App() {

    const { userData } = useSelector( state => state.auth )
    const getUserData = useGetUserData()
    useEffect( () => { getUserData() }, [ userData ] )

    return (

        <>

            <Suspense  fallback={ <div>Loading</div> }>

                <Routes>

                    <Route element={ <Landing /> } path='/' />
                    <Route element={ <Login /> } path='/login' />
                    <Route element={ <ProtectAdmin><Admin /></ProtectAdmin> } path='/admin' />
                    <Route element={ <ProtectAdmin><AdminStdLst /></ProtectAdmin> } path='/listStudent' />

                </Routes>

            </Suspense>
            <Toaster />
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');`}</style>

        </>

    )

}

export default App
