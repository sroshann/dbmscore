import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

// Protecting auth routes
export const ProtectAuth = ({ children }) => {

    const { isAuthenticated } = useSelector( state => state.auth )
    if( isAuthenticated ) return <Navigate to={'/'} replace />
    return children

}

// Protecting admin routes
export const ProtectAdmin = ({ children }) => {

    const { isAuthenticated, userData } = useSelector( state => state.auth )

    if( isAuthenticated && userData?.role === 'a' ) return children
    else return <Navigate to={'/'} replace />

}