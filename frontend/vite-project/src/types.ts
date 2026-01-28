// === API Response Types ===

export interface SignupResponse {
  userId: string;
}

export interface SigninResponse {
  token: string;
}

export interface Avatar {
  id: string;
  name: string | null;
  imageUrl: string | null;
}

export interface AvatarBulkItem {
  userId: string;
  imageUrl: string | null;
}

export interface SpaceListItem {
  id: string;
  name: string;
  height: number;
  width: number;
  thumbnail: string | null;
}

export interface SpaceElement {
  id: string;
  element: {
    id: string;
    imageUrl: string;
    width: number;
    height: number;
    static: boolean;
  };
  x: number;
  y: number;
}

export interface SpaceDetail {
  dimensions: string;
  spaceElements: SpaceElement[];
}

export interface Element {
  id: string;
  imageUrl: string;
  static: boolean;
  height: number;
  width: number;
}

// === WebSocket Message Types ===

export interface WsSendJoin {
  type: "join";
  payload: { spaceId: string; token: string };
}

export interface WsSendMove {
  type: "move";
  payload: { x: number; y: number };
}

export type WsClientMessage = WsSendJoin | WsSendMove;

export interface WsSpaceJoined {
  type: "space-joined";
  payload: { spawn: { x: number; y: number }; users: { id: string }[] };
}

export interface WsUserJoined {
  type: "user-joined";
  payload: { odunId: string; x: number; y: number };
}

export interface WsMovement {
  type: "movement";
  payload: { x: number; y: number; odunId: string };
}

export interface WsMovementRejected {
  type: "movement-rejected";
  payload: { x: number; y: number };
}

export interface WsUserLeft {
  type: "user-left";
  payload: { odunId: string };
}

export type WsServerMessage =
  | WsSpaceJoined
  | WsUserJoined
  | WsMovement
  | WsMovementRejected
  | WsUserLeft;
