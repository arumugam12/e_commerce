import { verifyToken } from './jwtAuth.js';

export const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
        return res.status(401).json({ error: `Authentication Required!` })
    }

    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ error: "Invalid Token" });
        }
        req.seller = decoded;        
        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}