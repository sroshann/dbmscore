// import bcrypt from "bcryptjs"
import { generateToken } from "../lib/token.js"
import 'dotenv/config'
import { query } from "../lib/db.connection.js"

export const login = async (request, response) => {

    try {

        const { userName, password } = request?.body
        const user = await query('SELECT * FROM users WHERE userName = $1',[userName])

        if ( !user || user.length === 0 ) return response?.status(401).json({ error: 'Invalid credentials' })
        else if( user[0].password != password ) return response?.status(401).json({ error: 'Invalid credentials' })
        else {
    
            const { password, ...rest } = user[0]
            generateToken( rest?.userid, rest?.role, response )
            return response?.status( 200 ).json({ user : rest })
            
        }

    } catch (error) { return response?.status(500).json({ error: 'Error on login' }) }

}

export const logout = async ( request, response ) => {

    response?.clearCookie('Token')
    return response?.status(200).json({ message : 'Loged out' })

}