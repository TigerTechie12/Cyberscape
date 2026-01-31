import { WebSocket } from "ws";
import { RoomManager } from "./RoomManager.js";
import { client } from "@repo/db/client";
import jwt from "jsonwebtoken";
const JWT_PASSWORD = process.env.JWT_PASSWORD;
function getRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
export function createUser(ws) {
    let id = getRandomString(10);
    let odunId = null;
    let spaceId = null;
    let x = 0;
    let y = 0;
    function send(message) {
        ws.send(JSON.stringify(message));
    }
    const user = {
        id,
        odunId,
        spaceId,
        x,
        y,
        send,
        destroy: () => {
            if (spaceId) {
                RoomManager.broadcast(spaceId, id, { type: "user-left", payload: { odunId } });
                RoomManager.removeUser(spaceId, id);
            }
        }
    };
    ws.on("message", async (data) => {
        const parsedData = JSON.parse(data.toString());
        switch (parsedData.type) {
            case "join":
                await handleJoin(parsedData.payload);
                break;
            case "move":
                handleMove(parsedData.payload);
                break;
        }
    });
    async function handleJoin(payload) {
        try {
            const decoded = jwt.verify(payload.token, JWT_PASSWORD);
            if (!decoded.odunId) {
                ws.close();
                return;
            }
            odunId = decoded.odunId;
            user.odunId = odunId;
        }
        catch (error) {
            ws.close();
            return;
        }
        const space = await client.space.findFirst({
            where: { id: payload.spaceId }
        });
        if (!space) {
            ws.close();
            return;
        }
        spaceId = payload.spaceId;
        user.spaceId = spaceId;
        RoomManager.addUser(spaceId, user);
        x = Math.floor(Math.random() * space.width);
        y = Math.floor(Math.random() * space.height);
        user.x = x;
        user.y = y;
        send({
            type: "space-joined",
            payload: {
                spawn: { x, y },
                users: RoomManager.getUsersInRoom(spaceId)
                    .filter(u => u.id !== id)
                    .map(u => ({ id: u.id }))
            }
        });
        RoomManager.broadcast(spaceId, id, {
            type: "user-joined",
            payload: { odunId, x, y }
        });
    }
    function handleMove(payload) {
        const moveX = payload.x;
        const moveY = payload.y;
        const xDisplacement = Math.abs(x - moveX);
        const yDisplacement = Math.abs(y - moveY);
        const isValidMove = (xDisplacement === 1 && yDisplacement === 0) ||
            (xDisplacement === 0 && yDisplacement === 1);
        if (isValidMove && spaceId) {
            x = moveX;
            y = moveY;
            user.x = x;
            user.y = y;
            RoomManager.broadcast(spaceId, id, {
                type: "movement",
                payload: { x, y, odunId }
            });
        }
        else {
            send({
                type: "movement-rejected",
                payload: { x, y }
            });
        }
    }
    return user;
}
//# sourceMappingURL=User.js.map