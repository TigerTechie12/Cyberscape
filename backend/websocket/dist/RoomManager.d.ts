import type { OutgoingMessage } from './types.js';
type UserType = {
    id: string;
    send: (message: OutgoingMessage) => void;
};
declare function addUser(spaceId: string, user: UserType): void;
declare function removeUser(spaceId: string, userId: string): void;
declare function broadcast(spaceId: string, excludeUserId: string, message: OutgoingMessage): void;
declare function getUsersInRoom(spaceId: string): UserType[];
export declare const RoomManager: {
    rooms: Map<string, UserType[]>;
    addUser: typeof addUser;
    removeUser: typeof removeUser;
    broadcast: typeof broadcast;
    getUsersInRoom: typeof getUsersInRoom;
};
export {};
//# sourceMappingURL=RoomManager.d.ts.map