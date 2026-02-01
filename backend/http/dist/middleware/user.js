import jwt from 'jsonwebtoken';
export function userMiddleware(req, res, next) {
    console.log(">>> userMiddleware hit for:", req.method, req.path);
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Token not present" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.type !== 'User') {
            return res.status(403).json({ message: "Unable to verify" });
        }
        req.userId = decoded.userId;
        next();
    }
    catch (e) {
        return res.status(403).json({ message: "Something went wrong" });
    }
}
//# sourceMappingURL=user.js.map