"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_1 = __importDefault(require("../models/Users"));
const roleEnum_1 = require("../../shared/enum/roleEnum");
const loginRouter = (0, express_1.Router)();
// loginRouter.post('/login', async (req, res) => {
//     try {
//         const { userName, password } = req.body;
//         console.log('are we hitting post login');
//         if (!userName || !password) {
//             res.status(404).json({ message: 'username not valid duh' });
//         }
//         const newUser = await User.create({ userName, password });
//         res.status(200).json({ message: 'User Created saksesfuli', user: newUser });
//     } catch (error) {
//         console.error('error in post user create', error);
//         res.status(500).json({ message: ' server error post', error: error })
//     }
// })
loginRouter.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    console.log('Backend received userName:', userName, 'and password (for debug, remove later):', password);
    try {
        console.log("im inside the loin post");
        if (!userName || !password) {
            res.status(400).json({ message: 'username/password not valid duh' });
        }
        const currentUser = await Users_1.default.findOne({
            where: { userName: userName }
        });
        console.log('currentUser', currentUser);
        if (!currentUser) {
            res.status(401).json({ message: 'user not found' });
        }
        else {
            const passValid = password === currentUser.password;
            if (!passValid) {
                res.status(401).json({ message: 'Invalid credentials.' });
                console.log('passvalid', passValid);
            }
            console.log('Login successful for user:', userName);
            const userResponse = {
                userId: currentUser.userId,
                userName: currentUser.userName,
                subscriberName: currentUser.subscriberName,
                userStatus: currentUser.userStatus,
                role: currentUser.role,
            };
            let routePath = '';
            console.log('found current user!', userResponse.role, currentUser.role);
            console.log(userResponse.role);
            if (userResponse.role === roleEnum_1.roleEnum.Subscriber) {
                routePath = '/subscriber';
            }
            else if (userResponse.role === roleEnum_1.roleEnum.level1approver) {
                routePath = '/levelOne';
            }
            else if (userResponse.role === roleEnum_1.roleEnum.level2approver) {
                routePath = '/levelTwo';
            }
            res.status(200).json({ message: userResponse, routePath });
        }
    }
    catch (error) {
        console.error('error in post user create', error);
        res.status(500).json({ message: ' server error post', error: error });
    }
});
exports.default = loginRouter;
