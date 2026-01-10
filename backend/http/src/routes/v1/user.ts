import { userMetaData } from "common";
import { Router } from "express";
const router=Router()
router.post('/metadata',(req,res)=>{
    const body=req.body
    if(!userMetaData.safeParse(body)){
        res.status(400).json({message:"Wrong Inputs"})
    }
    //Id user doesnt exist in db return 403
res.status(200).json({Message:"Udpated metadata"})

})
router.get('/avatars',(req,res)=>{
//get info from db and return
res.status(200).json({})

})

router.get('/metadata/bulk?ids=[]',(req,res)=>{
    //get info from db and return
res.status(200).json({})
})

