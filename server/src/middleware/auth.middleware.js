import jwt from 'jsonwebtoken'

// Protecting user function routes on checking the presence of token
export const adminRoute = async ( request, response, next ) => {

    try {

        const token = request.cookies.Token
        if( token ) {

            const decode = jwt.verify( token, process.env.JWT_SECRET )
            if( decode ) {

                const { userid, role } = decode
                if( role === 'a' ) next()
                else return response?.status( 401 ).json({ error : 'Unauthorized' })

            }
            else return response.status( 401 ).json({ error : 'Invalid token' })

        } else return response.status( 401 ).json({ error : 'No token provided' })

    } catch( error ) { return response.status( 500 ).json({ error : 'Error on finding token' }) }

}