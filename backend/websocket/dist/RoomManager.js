const rooms = new Map();
function addUser(spaceId, user) {
    const existingUsers = rooms.get(spaceId);
    if (!existingUsers) {
        rooms.set(spaceId, [user]);
    }
    else {
        rooms.set(spaceId, [...existingUsers, user]);
    }
}
function removeUser(spaceId, userId) {
    const existingUsers = rooms.get(spaceId);
    if (!existingUsers) {
        return;
    }
    const updatedArray = existingUsers.filter((u) => (u.id !== userId));
    rooms.set(spaceId, updatedArray);
}
function broadcast(spaceId, excludeUserId, message) {
    const existingUsers = rooms.get(spaceId);
    if (!existingUsers) {
        return;
    }
    const usersToSend = existingUsers.filter((u) => (u.id !== excludeUserId));
    usersToSend.forEach((u) => { u.send(message); });
}
function getUsersInRoom(spaceId) {
    return rooms.get(spaceId) ?? [];
}
export const RoomManager = {
    rooms,
    addUser,
    removeUser,
    broadcast,
    getUsersInRoom
};
//# sourceMappingURL=RoomManager.js.map