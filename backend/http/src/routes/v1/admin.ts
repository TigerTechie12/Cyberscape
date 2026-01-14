import { Router } from "express";
import { mapCreator,updateImage,avatarInputs,adminMap } from "common";
import {client} from '@repo/db/client'
const router=Router()

router.post('/admin/element',(req,res)=>{
    const body=req.body
if(!mapCreator.safeParse(body).success){
    res.json({message:"Wrong Inputs"})
  
}

res.json({id})
})
router.put('/admin/element/:elementId',(req,res)=>{
    const id=req.params
    const body=req.body
if(!updateImage.safeParse(body).success){
        res.json({message:"Wrong Inputs"})
}
//db logic
res.status(200).json({message:"Inputs updated"})
})
router.post('/admin/avatar',(req,res)=>{
const body=req.body
if(!avatarInputs.safeParse(body).success){
    res.json({message:"Wrong Inputs"})
}
//db logic
res.status(200).json({avatarId})

})
router.post('/admin/map',(req,res)=>{
const body=req.body
if(!adminMap.safeParse(body).success){
    res.json({message:"Wrong Inputs"})
}
//db logic
res.status(200).json({mapId})

})

