import jwt from 'jsonwebtoken';

const secret_key = "THE KING IN THE NORTH! LONG LIVE THE KING!";

export const generateToken = (email) => {
    const payload = { email };
    const options = { expiresIn : "10hr" };
    return jwt.sign(payload, secret_key, options);
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret_key)
    } catch (error) {
        return null;
    }
}