import {User} from "./User.js"
import type {outgoingMessages} from './types.js'

type UserType={
    id:string,
    send:(message:outgoingMessages)=>void
}

const rooms:Map<string,UserType[]>=new Map()
function addUser(){}
function removeUser(){

}
function broadcast(){}
function getUsersInRoom(){}
