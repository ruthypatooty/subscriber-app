import { Router } from "express";
import Subscriber from "../models/Subscriber";
import { SubscriberEnum } from "@/shared/enum/statusEnum";
const activeRouter = Router();
activeRouter.get('/active-subscribers', async (req, res) => {
    try {
        console.log('active route called!');
        const activesubs = await Subscriber.findOne({
            where: { status: SubscriberEnum.Level2Approved },
            order: [['updatedAt', 'DESC']]
        });
        res.status(200).json(activesubs);
    }
    catch (error) {
        console.error('error in get sctive subs');
        res.status(500).json({ message: 'active subs router problem' });
    }
});
export default activeRouter;
//# sourceMappingURL=activeSubRoutes.js.map