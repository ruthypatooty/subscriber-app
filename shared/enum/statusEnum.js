"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberEnum = void 0;
var SubscriberEnum;
(function (SubscriberEnum) {
    SubscriberEnum[SubscriberEnum["Sent"] = 0] = "Sent";
    SubscriberEnum[SubscriberEnum["Pending"] = 4] = "Pending";
    SubscriberEnum[SubscriberEnum["Level1Approved"] = 1] = "Level1Approved";
    SubscriberEnum[SubscriberEnum["Level2Approved"] = 2] = "Level2Approved";
    SubscriberEnum[SubscriberEnum["Rejected"] = 3] = "Rejected";
})(SubscriberEnum || (exports.SubscriberEnum = SubscriberEnum = {}));
