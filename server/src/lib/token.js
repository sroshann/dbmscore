import jwt from 'jsonwebtoken'

export const generateToken = ( userId, role, response ) => {

    const token = jwt.sign( { userId, role }, process.env.JWT_SECRET, { expiresIn : '1d' } )
    response.cookie('Token', token, {

        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000

    })
    return token

}