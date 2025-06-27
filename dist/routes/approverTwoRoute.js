"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Subscriber_1 = __importDefault(require("../models/Subscriber"));
const statusEnum_1 = require("../../shared/enum/statusEnum");
const level2router = (0, express_1.Router)();
level2router.get('/firstlevelapproved', async (req, res) => {
    try {
        const pendingSubs = await Subscriber_1.default.findAll({
            where: { status: statusEnum_1.SubscriberEnum.Level1Approved },
        });
        res.status(200).json(pendingSubs);
    }
    catch (error) {
        console.error("error in get level2", error);
        res.status(500).json({ message: 'get level 2 error' });
    }
});
level2router.post('/decision', async (req, res) => {
    try {
        const { subscriberId, decision } = req.body;
        console.log("recevied decision request: from level 2", { subscriberId, decision });
        if (!subscriberId || !decision) {
            res.json(400).json({ message: "missing required fields" });
        }
        const [updatedRowsCount] = await Subscriber_1.default.update({ status: decision }, { where: { id: subscriberId } });
        if (updatedRowsCount === 0) {
            res.status(404).json({ message: "subscriber not found" });
        }
        res.status(200).json({
            message: "record udpated by level 2",
            subscriberId,
            decision
        });
    }
    catch (error) {
        console.error("Error in POST /decision for Level 2 approver:", error);
    }
});
exports.default = level2router;
