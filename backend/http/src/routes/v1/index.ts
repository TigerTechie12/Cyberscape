import { Router } from "express";
import { InputModel } from "common";
import {client} from "@repo/db/client"
import jwt from 'jsonwebtoken'
const router=Router()
const JWT_SECRET:any=process.env.JWT_SECRET
router.post('/signup',async(req,res)=>{
const inputs=req.body
const parsedData=InputModel.safeParse(inputs)
if(!parsedData.success){
    return res.status(400)
}
try{const userData:any= await client.user.create({data:
    {username:parsedData.data.username,
password:parsedData.data.password,
type:parsedData.data.type
}

})
const userId=userData.data.id
return res.json({userId}).status(200)}
catch(e){
    res.status(403).json({message:"something went wrong"})
}
})

router.post('/signin',async(req,res)=>{
const inputs=req.body
const parsedData=InputModel.safeParse(inputs)
if(!parsedData.success){
    return res.status(400)
}
try{const dbFindUser=await client.user.findUnique({where:{username:parsedData.data.username,
    password:parsedData.data.password
}})
if(dbFindUser){
    const token=jwt.sign({username:parsedData.data.username,
      
        type:parsedData.data.type
    },
JWT_SECRET,{
    expiresIn:"24h"
})
return res.json({token}).status(200)
}
else{
    return res.status(400).json({message:"User not found"})
}

}
catch(e){
    return res.status(403).json({message:"something went wrong"})
}
})
