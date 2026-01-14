import { Router } from "express";
import { InputModel } from "common";
import {client} from "@repo/db/client"
const router=Router()
router.post('/signup',async(req,res)=>{
const inputs=req.body
const parsedData=InputModel.safeParse(inputs)
if(!parsedData.success){
    return res.status(400)
}
const userData= await client.user.create({data:
    {username:parsedData.data.username,
password:parsedData.data.password,
type:parsedData.data.type
}

})
return res.json({message:"Signup"}).status(200)
})

router.post('/signin',(req,res)=>{
const inputs=req.body
if(!InputModel.safeParse(inputs).success){
    return res.status(400)
}
return res.json({message:"Signin"}).status(200)

})
