"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Subscriber_1 = __importDefault(require("../models/Subscriber"));
const statusEnum_1 = require("../../shared/enum/statusEnum");
const activeRouter = (0, express_1.Router)();
activeRouter.get('/active-subscribers', async (req, res) => {
    try {
        console.log('active route called!');
        const activesubs = await Subscriber_1.default.findOne({
            where: { status: statusEnum_1.SubscriberEnum.Level2Approved },
            order: [['updatedAt', 'DESC']]
        });
        res.status(200).json(activesubs);
    }
    catch (error) {
        console.error('error in get sctive subs');
        res.status(500).json({ message: 'active subs router problem' });
    }
});
exports.default = activeRouter;
