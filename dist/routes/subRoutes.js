"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Subscriber_1 = __importDefault(require("../models/Subscriber"));
const statusEnum_1 = require("../../shared/enum/statusEnum");
const subcriberRouter = (0, express_1.Router)();
subcriberRouter.post('/', async (req, res) => {
    const { subscriberName, status } = req.body;
    if (!subscriberName) {
        res.status(404).json({ message: 'invalid subscriber name' });
    }
    try {
        const subExists = await Subscriber_1.default.findOne({
            where: { subscriberName: subscriberName }
        });
        if (subExists) {
            res.status(409).json({ message: "cannot have duplicate entries" });
        }
        else {
            const newSubscriber = await Subscriber_1.default.create({ subscriberName, status: status | statusEnum_1.SubscriberEnum.Sent });
            res.status(200).json({
                message: 'Subscriber created',
                subscriber: newSubscriber,
            });
        }
    }
    catch (error) {
        console.error('error in post', error);
    }
});
exports.default = subcriberRouter;
