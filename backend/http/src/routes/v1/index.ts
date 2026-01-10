import { Router } from "express";
import { InputModel } from "common";
const router=Router()
router.post('/signup',(req,res)=>{
const inputs=req.body
if(!InputModel.safeParse(inputs)){
    return res.status(400)
}
return res.json({message:"Signup"}).status(200)
})

router.post('/signin',(req,res)=>{
const inputs=req.body
if(!InputModel.safeParse(inputs).success){
    return res.status(400)
}
return res.json({message:"Signin"}).status(200)

})
