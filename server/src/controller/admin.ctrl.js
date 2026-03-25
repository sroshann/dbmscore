import { query } from "../lib/db.connection.js"
import jwt from 'jsonwebtoken'

// Student registration
export const regStudent = async (request, response) => {

    try {

        let { firstName, lastName, dob, department, roll_number, cgpa, password, email } = request?.body

        const student = await query('select * from students where roll_number = $1 or email = $2', [roll_number, email])
        if (student?.length > 0) return response.status(500).json({ error: 'Student already exists' })

        const admin = await query('select * from admins where adminname = $1 or email = $2', [roll_number, email])
        if (admin?.length > 0) {

            if (admin[0].adminname === roll_number)
                return response.status(500).json({ error: 'Roll number is not available' })
            if (admin[0].email === email) return response.status(500).json({ error: 'Email is not available' })

        }

        cgpa = parseFloat(cgpa)
        const result = await query(

            `INSERT INTO students
            (first_name, last_name, date_of_birth, department, roll_number, cgpa, password, email)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id, roll_number, password`,
            [firstName, lastName, dob, department, roll_number, cgpa, password, email]

        )

        {

            let { id, roll_number, password } = result[0]
            await query(

                `insert into users (userid, username, password, role)
                values ($1, $2, $3, $4)`,
                [id, roll_number, password, 's']

            )

        }

        return response?.status(200).json({ student: result[0] })

    } catch (error) { return response?.status(500).json({ error: 'Error on registering student' }) }

}

// Get students
export const getStds = async (request, response) => {

    try {

        const students = await query('select * from students')
        if (students?.length === 0) return response?.status(404).json({ error: 'Student list is empty' })
        else return response?.status(200).json({ students })

    } catch (error) { return response?.status(500).json({ error: 'Error on getting student data' }) }

}

// Company registration
export const regCompany = async (request, response) => {

    try {

        let { cname, cnickname, location, cmail, cweb, contactnumber, password } = request?.body

        const company = await query('select * from company where cname = $1 or cmail = $2', [cname, cmail])
        if (company?.length > 0) return response.status(500).json({ error: 'Company already exists' })

        const admin = await query('select * from admins where adminname = $1 or email = $2', [cname, cmail])
        if (admin?.length > 0) {

            if (admin[0].adminname === cname)
                return response.status(500).json({ error: 'Company name not available' })
            if (admin[0].email === cmail) return response.status(500).json({ error: 'Email is not available' })

        }

        const result = await query(

            `INSERT INTO company
            (cname, cnickname, location, cmail, cweb, password, contactnumber)
            VALUES ($1, $2, $3, $4, $5, $6, $7) returning id, cname, password`,
            [cname, cnickname, location, cmail, cweb, password, contactnumber]

        )

        {

            let { id, cname, password } = result[0]
            await query(

                `insert into users (userid, username, password, role)
                values ($1, $2, $3, $4)`,
                [id, cname, password, 'c']

            )

        }

        return response?.status(200).json({ student: result[0] })

    } catch (error) { return response?.status(500).json({ error: 'Error on company registration' }) }

}

// Get students
export const getCmpnys = async (request, response) => {

    try {

        const company = await query('select * from company')
        if (company?.length === 0) return response?.status(404).json({ error: 'Company list is empty' })
        else {

            const { password, ...rest } = company[0]
            return response?.status(200).json({ companies: rest })

        }

    } catch (error) { return response?.status(500).json({ error: 'Error on getting student data' }) }

}

// Get admin
export const getAdmin = async (request, response) => {

    try {

        const token = request.cookies.Token
        if (token) {

            const decode = jwt.verify(token, process.env.JWT_SECRET)
            if (decode) {

                const { userId, role } = decode
                const user = await query('SELECT * FROM admins WHERE id = $1', [userId])
                if (user && user?.length > 0) {

                    const { password, ...rest } = user[0]
                    return response?.status(200).json({ user: rest })

                }
                else return response?.status(401).json({ error: 'Unauthorized' })

            }

        } else return

    } catch (error) { return response?.status(500).json({ error: 'Error on getting admin data' }) }

}