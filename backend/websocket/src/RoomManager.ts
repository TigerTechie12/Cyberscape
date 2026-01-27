
import type {OutgoingMessage} from './types.js'

type UserType={
    id:string,
    send:(message:OutgoingMessage)=>void
}

 const rooms:Map<string,UserType[]>=new Map()
 function addUser(spaceId:string,user:UserType){
    const existingUsers=rooms.get(spaceId)
if(!existingUsers){
rooms.set(spaceId,[user])
}
else{
    rooms.set(spaceId,[...existingUsers,user])
}
}
 function removeUser(spaceId:string,userId:string){
const existingUsers=rooms.get(spaceId)
if(!existingUsers){return}
const updatedArray=existingUsers.filter((u)=>(u.id!==userId))
rooms.set(spaceId,updatedArray)
}
 function broadcast(spaceId:string,excludeUserId:string,message:OutgoingMessage){
const existingUsers=rooms.get(spaceId)
if(!existingUsers){return}
const usersToSend=existingUsers.filter((u)=>(u.id !==excludeUserId)
)
usersToSend.forEach((u)=>{u.send(message)})


}
 function getUsersInRoom(spaceId:string):UserType[]{
return rooms.get(spaceId) ?? []
}
export const RoomManager={
rooms,
addUser,
removeUser,
broadcast,
getUsersInRoom
}
