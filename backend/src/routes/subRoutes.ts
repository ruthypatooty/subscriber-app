import { Router } from "express";
import Subscriber from "../models/Subscriber";
import { SubscriberEnum } from "@/shared/enum/statusEnum";

const subcriberRouter = Router();

subcriberRouter.post('/', async(req,res)=>{
    const {subscriberName, status} = req.body;

    if(!subscriberName){
        res.status(404).json({message: 'invalid subscriber name'});
    }

    try{
        const subExists = await Subscriber.findOne({
            where: {subscriberName:subscriberName}
        })

        if(subExists){
            res.status(409).json({message: "cannot have duplicate entries"});
        }else{
            const newSubscriber = await Subscriber.create({subscriberName, status:status|SubscriberEnum.Sent});

            res.status(200).json({
                message: 'Subscriber created',
                subscriber: newSubscriber,

            })
        }

    }catch(error){
        console.error('error in post', error);
    }
})

export default subcriberRouter;