import toast from "react-hot-toast"
import { axiosInstance, toastStyle } from "../lib/constants.lib"
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated, setUserData } from "../Store/Reducers/auth.reducer"
import { useLocation, useNavigate } from "react-router-dom"

// Login hook
export const useLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    return async ( data ) => {

        const loading = toast.loading('Loading', { style : toastStyle })
        try {

            const response = await axiosInstance.post('/authenticate/login', data)
            const { user } = response?.data
            toast.success('Authenticated', { style : toastStyle })
            dispatch( setUserData( user ) ) // Storing user data on redux
            dispatch( setIsAuthenticated() ) // Setting authentication flag

            const { role } = user
            if( role === 'a' ) navigate('/admin')
            else if ( role === 's' ) navigate('/student')
            else if ( role === 'c' ) navigate('/company')
            else navigate('/')

        } catch ( error ) { toast.error( error?.response?.data?.error, { style : toastStyle } ) }
        finally { toast.remove( loading ) }

    }

}

// Logout
export const useLogout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    return async () => {

        const loading = toast.loading('Loading', { style : toastStyle })
        try {

            const response = await axiosInstance.get('/authenticate/logout')
            const { message } = response?.data
            toast.success(message , { style : toastStyle })
            dispatch( setUserData( null ) ) // Storing null on redux
            dispatch( setIsAuthenticated() ) // Setting authentication flag
            navigate('/')

        } catch( error ) { toast.error( error?.response?.data?.error, { style : toastStyle } ) }
        finally { toast.remove( loading ) }

    }

}

// Get user details on data loss on checking whether the token is still exist in backend or not
export const useGetUserData = () => {

    const { userData } = useSelector( state => state.auth )
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    
    return async () => {

        try {

            if( userData === null ) {
                
                const response = await axiosInstance.get('/authenticate/getUserData')
                const { user } = response?.data
                dispatch( setUserData( user ) )
                dispatch( setIsAuthenticated() )
                navigate( location?.pathname || '/', { replace : true } )
                
            } else return

        } catch( error ) { toast.error( error?.response?.data?.error, { style : toastStyle } ) }

    }

}
