import { Router } from "express";
import { InputModel } from "common";
import { client } from "@repo/db/client";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;
router.post('/signup', async (req, res) => {
    const inputs = req.body;
    const parsedData = InputModel.safeParse(inputs);
    if (!parsedData.success) {
        return res.status(400);
    }
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    try {
        const userData = await client.user.create({ data: { username: parsedData.data.username,
                password: hashedPassword,
                type: parsedData.data.type
            }
        });
        const userId = userData.data.id;
        return res.json({ userId }).status(200);
    }
    catch (e) {
        res.status(403).json({ message: "something went wrong" });
    }
});
router.post('/signin', async (req, res) => {
    const inputs = req.body;
    const parsedData = InputModel.safeParse(inputs);
    if (!parsedData.success) {
        return res.status(400);
    }
    try {
        const dbFindUser = await client.user.findUnique({ where: { username: parsedData.data.username,
            } });
        if (!dbFindUser) {
            return res.status(403).json({ Message: "User not found" });
        }
        const password = await client.user.findUnique({ where: { username: parsedData.data.username } });
        const isValid = await bcrypt.compare(parsedData.data.password, password);
        if (isValid) {
            const token = jwt.sign({ username: parsedData.data.username,
                type: parsedData.data.type
            }, JWT_SECRET, {
                expiresIn: "24h"
            });
            return res.json({ token }).status(200);
        }
        else {
            return res.status(400).json({ message: "User not found" });
        }
    }
    catch (e) {
        return res.status(403).json({ message: "something went wrong" });
    }
});
//# sourceMappingURL=index.js.map