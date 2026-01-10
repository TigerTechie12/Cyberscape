import { Router } from "express";
import {spaceData} from "common"
import { spaceElements } from "common";
const router=Router()
router.post('/space',(req,res)=>{
const body=req.body
if(!spaceData.safeParse(body).success){
    res.status(400).json({message:"Invalid Inputs"})
}
//create in db
res.status(200).json({spaceId})
})

router.delete('/space/:spaceId',(req,res)=>{
    //db logic
    res.status(400).json({message:'space deleted'})
})
router.get('/space/all',(req,res)=>{
    //db logic
    res.status(200).json({})
})
router.get('/space/:spaceId',(req,res)=>{
//db logic

res.status(200).json({})
})
router.post('/space/element',(req,res)=>{
    const body=req.body
if(!spaceElements.safeParse(body).success){
    res.status(400).json({message:"invalid inputs"})
    }
//db logic
res.status(200).json({message:"element created"})
})
router.delete('/space/element/:id',(req,res)=>{
    const id=req.params.id
//db logic
res.status(200).json({message:"element deleted"})
})

router.get('/elements',(req,res)=>{
    //db logic
    res.json({elements}).status(200)
})
