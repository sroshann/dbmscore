// import bcrypt from "bcryptjs"
// import { generateToken } from "../lib/token.js"
import 'dotenv/config'
import pool from "../lib/db.connection.js"

export const test = async ( request, response ) => {

    const client = await pool.connect()
    try {

        const result = await client.query('select * from admins')
        return response.status( 200 ).json({ data : result?.rows })

    } catch ( error ) { return response.status( 500 ).json({ error : error?.message }) }
    finally { client.release() }

}