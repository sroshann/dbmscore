import { query } from "../lib/db.connection.js"

// Student registration
export const regStudent = async ( request, response ) => {

    try {

        let { firstName, lastName, dob, age, department, roll_number, cgpa, password } = request?.body

        const student = await query('select * from students where roll_number = $1', [roll_number])
        if( student?.length > 0 ) return response.status( 500 ).json({ error : 'Student already exists' })

        const admin = await query('select * from admins where adminname = $1', [roll_number])
        if( admin?.length > 0 ) return response.status( 500 ).json({ error : 'Roll number is not available' })

        age = Number( age )
        cgpa = Number( cgpa )
        const result = await query(

            `INSERT INTO students
            (first_name, last_name, date_of_birth, age, department, roll_number, cgpa, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id, roll_number, password`,
            [firstName, lastName, dob, age, department, roll_number, cgpa, password]

        )
        
        {

            let { id, roll_number, password } = result[0]
            await query(
    
                `insert into users (userid, username, password, role)
                values ($1, $2, $3, $4)`,
                [ id, roll_number, password, 's' ]
    
            )

        }

        return response?.status( 200 ).json({ student : result[0] })

    } catch ( error ) { return response?.status( 500 ).json({ error : 'Error on registering student' }) }

}