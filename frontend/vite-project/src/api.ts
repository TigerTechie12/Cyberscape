import axios from "axios";
import type {
  SignupResponse,
  SigninResponse,
  Avatar,
  AvatarBulkItem,
  SpaceListItem,
  SpaceDetail,
  Element,
} from "./types";

const API_BASE = "http://localhost:3000/api/v1";

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === Auth ===

export async function signup(
  username: string,
  password: string,
  type: "Admin" | "User"
) {
  const res = await api.post<SignupResponse>("/signup", {
    username,
    password,
    type,
  });
  return res.data;
}

export async function signin(
  username: string,
  password: string,
  type: "Admin" | "User"
) {
  const res = await api.post<SigninResponse>("/signin", {
    username,
    password,
    type,
  });
  return res.data;
}

// === User ===

export async function updateMetadata(avatarId: string) {
  await api.post("/metadata", { avatarId });
}

export async function getAvatars() {
  const res = await api.get<{ avatars: Avatar[] }>("/avatars");
  return res.data.avatars;
}

export async function getMetadataBulk(ids: string[]) {
  const res = await api.get<{ avatars: AvatarBulkItem[] }>(
    `/metadata/bulk?ids=[${ids.join(",")}]`
  );
  return res.data.avatars;
}

// === Spaces ===

export async function createSpace(
  name: string,
  dimensions: string,
  mapId?: string
) {
  const res = await api.post<{ spaceId: string }>("/space", {
    name,
    dimensions,
    ...(mapId ? { mapId } : {}),
  });
  return res.data;
}

export async function deleteSpace(spaceId: string) {
  await api.delete(`/space/${spaceId}`);
}

export async function getAllSpaces() {
  const res = await api.get<{ dbData: SpaceListItem[] }>("/space/all");
  return res.data.dbData;
}

export async function getSpace(spaceId: string) {
  const res = await api.get<SpaceDetail>(`/space/${spaceId}`);
  return res.data;
}

export async function addSpaceElement(
  elementId: string,
  spaceId: string,
  x: number,
  y: number
) {
  await api.post("/space/element", { elementId, spaceId, x, y });
}

export async function deleteSpaceElement(id: string) {
  await api.delete(`/space/element/${id}`);
}

export async function getElements() {
  const res = await api.get<{ elements: Element[] }>("/elements");
  return res.data.elements;
}

// === Admin ===

export async function adminCreateElement(
  imageUrl: string,
  width: number,
  height: number,
  isStatic: boolean
) {
  const res = await api.post<{ id: string }>("/admin/element", {
    imageUrl,
    width,
    height,
    static: isStatic,
  });
  return res.data;
}

export async function adminUpdateElement(elementId: string, imageUrl: string) {
  await api.put(`/admin/element/${elementId}`, { imageUrl });
}

export async function adminCreateAvatar(imageUrl: string, name: string) {
  const res = await api.post<{ avatarId: string }>("/admin/avatar", {
    imageUrl,
    name,
  });
  return res.data;
}

export async function adminCreateMap(
  thumbnail: string,
  dimensions: string,
  name: string,
  defaultElements: { elementId: string; x: number; y: number }[]
) {
  const res = await api.post<{ mapId: string }>("/admin/map", {
    thumbnail,
    dimensions,
    name,
    defaultElements,
  });
  return res.data;
}
