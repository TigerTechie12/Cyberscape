import { WebSocket } from "ws";
import type { OutgoingMessage } from "./types.js";
type User = {
    id: string;
    odunId: string | null;
    spaceId: string | null;
    x: number;
    y: number;
    send: (message: OutgoingMessage) => void;
    destroy: () => void;
};
export declare function createUser(ws: WebSocket): User;
export {};
//# sourceMappingURL=User.d.ts.map