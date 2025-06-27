import { Router } from "express";
import Subscriber from "../models/Subscriber";
import { SubscriberEnum } from "../../shared/enum/statusEnum";


const level1router = Router();

level1router.get('/pending-subscribers',async(req,res)=>{
    try{
        const pendingSubs = await Subscriber.findAll({
            where:{ status: SubscriberEnum.Sent},
        })

        res.status(200).json(pendingSubs);
        
    }catch(error){
        console.error("error in get level1", error);
        res.status(500).json({message: 'get level 1 error'});
    }
});

level1router.post('/decision',async(req,res)=>{
    try{
        const {subscriberId, decision} = req.body;
        console.log("recevied decision request:", {subscriberId, decision});

        if(!subscriberId||!decision){
            res.json(400).json({message:"missing required fields"});
        }

        const [updatedRowsCount]= await Subscriber.update(
            {status: decision},
            {where:{id:subscriberId}}
        );
        if(updatedRowsCount===0){
            res.status(404).json({message:"subscriber not found"});
        }

        res.status(200).json({
            message:"record udpated",
            subscriberId,
            decision
        });

    }catch(error){
        console.error("Error in POST /decision for Level 1 approver:", error);
    }
})

export default level1router;