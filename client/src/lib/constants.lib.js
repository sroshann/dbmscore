import axios from 'axios'

export const axiosInstance = axios.create({

    baseURL : import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '',
    withCredentials : true

})

export const toastStyle = {

    borderRadius: '10px',
    background: '#333',
    color: '#fff',
    fontSize : '14px',
    fontFamily : 'Nexa Light'

}