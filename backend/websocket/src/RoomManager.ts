import {User} from "./User.js"
import type {outgoingMessages} from './types.js'

type UserType={
    id:string,
    send:(message:outgoingMessages)=>void
}

export const rooms:Map<string,UserType[]>=new Map()
export function addUser(spaceId:string,user:UserType){
    const existingUsers=rooms.get(spaceId)
if(!existingUsers){
rooms.set(spaceId,[user])
}
else{
    rooms.set(spaceId,[...existingUsers,user])
}
}
export function removeUser(spaceId:string,userId:string){
const existingUsers=rooms.get(spaceId)
if(!existingUsers){return}
const updatedArray=existingUsers.filter((u)=>(u.id!==userId))
rooms.set(spaceId,updatedArray)
}
export function broadcast(spaceId:string,excludeUserId:string,message:outgoingMessages){
const existingUsers=rooms.get(spaceId)
if(!existingUsers){return}
const usersToSend=existingUsers.filter((u)=>(u.id !==excludeUserId)
)
usersToSend.forEach((u)=>{u.send(message)})


}
export function getUsersInRoom(spaceId:string):UserType[]{
return rooms.get(spaceId) ?? []
}
