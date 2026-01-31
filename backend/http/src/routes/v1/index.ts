import { Router } from "express";
import { InputModel } from "common";
import {client} from "@repo/db/client"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const router=Router()
const JWT_SECRET:any=process.env.JWT_SECRET
router.post('/signup',async(req,res)=>{
const inputs=req.body
const parsedData=InputModel.safeParse(inputs)
if(!parsedData.success){
    console.log("Validation failed:", parsedData.error)
    return res.status(400).json({message:"Invalid input", errors: parsedData.error.issues})
}
const hashedPassword=await bcrypt.hash(parsedData.data.password,10)
try{
    const userData = await client.user.create({data: {
        username: parsedData.data.username,
        password: hashedPassword,
        type: parsedData.data.type
    }})
    const userId = userData.id
    return res.status(200).json({userId})
} catch(e){
    console.log("Database error:", e)
    return res.status(403).json({message:"something went wrong"})
}
})

router.post('/signin',async(req,res)=>{
const inputs=req.body
const parsedData=InputModel.safeParse(inputs)
if(!parsedData.success){
    return res.status(400).json({message:"Invalid input"})
}
try{const dbFindUser=await client.user.findUnique({where:{username:parsedData.data.username}})
if(!dbFindUser){
    return res.status(403).json({Message:"User not found"})
}
if(dbFindUser.type!==parsedData.data.type){
    return res.status(403).json({message:"Invalid credentials"})
}
const isValid=await bcrypt.compare(parsedData.data.password,dbFindUser.password)
if(isValid){
    const token=jwt.sign({username:parsedData.data.username,

        type:dbFindUser.type
    },
JWT_SECRET,{
    expiresIn:"24h"
})
return res.status(200).json({token})
}
else{
    return res.status(400).json({message:"User not found"})
}

}
catch(e){
    return res.status(403).json({message:"something went wrong"})
}
})

router.get('/elements',async(_req,res)=>{
try{
    const elements=await client.element.findMany()
    return res.status(200).json({elements})
}catch(e){
    return res.status(500).json({message:"Something went wrong"})
}
})

router.get('/avatars',async(_req,res)=>{
try{
    const avatars=await client.avatar.findMany()
    return res.status(200).json({avatars})
}catch(e){
    return res.status(500).json({message:"Something went wrong"})
}
})

router.get('/maps',async(_req,res)=>{
try{
    const maps=await client.maps.findMany({
        include:{mapElements:true}
    })
    return res.status(200).json({maps})
}catch(e){
    return res.status(500).json({message:"Something went wrong"})
}
})

export default router
