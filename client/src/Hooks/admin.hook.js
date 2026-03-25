import toast from "react-hot-toast"
import { axiosInstance, toastStyle } from "../lib/constants.lib"
import { useDispatch } from "react-redux"
import { setUserData } from "../Store/Reducers/auth.reducer"

export const useGetAdmin = () => {

    const dispatch = useDispatch()
    return async () => {

        try {

            const response = await axiosInstance.get('/admin/getAdmin')
            const { user } = response?.data
            dispatch(setUserData(user))

        } catch (error) { toast.error(error?.response?.data?.error, { style: toastStyle }) }

    }

}

export const useGetStudents = () => {

    return async () => {

        const loading = toast.loading('Getting students', { style: toastStyle })
        try {

            const response = await axiosInstance.get('/admin/getStds')
            const { students } = response?.data
            return students

        } catch (error) { toast.error(error?.response?.data?.error, { style: toastStyle }) }
        finally { toast.remove(loading) }

    }

}

export const useAddStudent = () => {

    return async ( data ) => {

        const loading = toast.loading('Adding student', { style: toastStyle })
        try {

            await axiosInstance.post('/admin/registerStd', data)
            toast.success( 'Student added successfully', { style : toastStyle } )

        } catch (error) { toast.error(error?.response?.data?.error, { style: toastStyle }) }
        finally { toast.remove(loading) }

    }

}