import { Router } from "express";
import { spaceData } from "common";
import { client } from '@repo/db/client';
import { spaceElements } from "common";
const router = Router();
import jwt, {} from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
router.post('/space', async (req, res) => {
    const body = req.body;
    const parsedSpaceData = spaceData.safeParse(body);
    if (!parsedSpaceData.success) {
        return res.status(400).json({ message: "Invalid Inputs" });
    }
    try {
        const dbDataCreation = await client.space.create({ data: {
                name: parsedSpaceData.data.name,
                mapId: parsedSpaceData.data.mapId,
                height: parsedSpaceData.data.height,
                width: parsedSpaceData.data.width
            }
        });
        const spaceId = dbDataCreation.id;
        return res.status(200).json({ spaceId });
    }
    catch (e) {
        return res.status(403).json({ message: "Something went wrong" });
    }
});
router.delete('/space/:spaceId', async (req, res) => {
    try {
        const id = req.params;
        const dbDataDelete = await client.space.delete({
            where: { id: id }
        });
        return res.status(400).json({ message: 'space deleted' });
    }
    catch (e) {
        return res.status(403).json({ message: "Something went wrong" });
    }
});
router.get('/space/all', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split("")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const id = decoded.userId;
    try {
        const dbData = await client.space.findMany({
            where: { creatorId: id },
            select: {
                name: true,
                id: true,
                height: true,
                width: true,
                thumbnail: true
            }
        });
        return res.status(200).json({ dbData });
    }
    catch (e) {
        return res.status(403).json({ message: "Something went wrong" });
    }
});
router.get('/space/:spaceId', async (req, res) => {
    const id = req.params;
    try {
        const dbData = await client.spaceElements.findMany({ where: { spaceId: id }, select: {
                elementId: true,
                x: true,
                y: true
            } });
        return res.status(200).json({ dbData });
    }
    catch (e) {
        return res.status(403).json({ message: "Something went wrong" });
    }
});
router.post('/space/element', async (req, res) => {
    const body = req.body;
    const parsedResult = spaceElements.safeParse(body);
    if (!parsedResult.success) {
        return res.status(400).json({ message: "invalid inputs" });
    }
    try {
        const dbData = await client.spaceElements.create({
            data: {
                elementId: parsedResult.data?.elementId,
                spaceId: parsedResult.data?.spaceId,
                x: parsedResult.data.x,
                y: parsedResult.data.y
            }
        });
        return res.status(200).json({ message: "element created" });
    }
    catch (e) {
        return res.status(403).json({ message: "Something went wrong" });
    }
});
router.delete('/space/element/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleteData = await client.spaceElements.deleteMany({ where: { spaceId: id } });
        return res.status(200).json({ message: "element deleted" });
    }
    catch (e) {
        return res.status(403).json({ message: "Something went wrong" });
    }
});
router.get('/elements', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split("")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const id = decoded.userId;
        const elements = await client.element.findMany({
            where: { creatorId: id }
        });
        return res.json({ elements }).status(200);
    }
    catch (e) {
        return res.status(403).json({ message: "Something went wrong" });
    }
});
//# sourceMappingURL=space.js.map