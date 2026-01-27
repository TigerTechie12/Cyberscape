import express from 'express';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
export function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).send("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'User') {
            return res.status(403).send("unable to verify");
        }
        req.userId = decoded.userId;
        next();
    }
    catch (e) {
        return res.json({ message: "Something went wrong" });
    }
}
//# sourceMappingURL=user.js.map