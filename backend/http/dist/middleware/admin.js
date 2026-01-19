import express from 'express';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
export function adminMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer')) {
        return res.status(403).json({ message: "Invalid" });
    }
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Token not present" });
    }
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        if (decode.role !== 'Admin') {
            return res.status(403).json({ message: "Invalid Token" });
        }
        req.adminId = decode.adminId;
    }
    catch (e) {
        return res.status(403).json({ message: "Something went wrong" });
    }
}
//# sourceMappingURL=admin.js.map