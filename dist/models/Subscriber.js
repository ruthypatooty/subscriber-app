"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const statusEnum_1 = require("../../shared/enum/statusEnum");
class Subscriber extends sequelize_1.Model {
}
Subscriber.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subscriberName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: statusEnum_1.SubscriberEnum.Pending,
    },
    // approverId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
}, {
    sequelize: database_1.sqlInstance,
    tableName: 'subscribers',
    timestamps: true,
    modelName: 'Subscriber',
});
exports.default = Subscriber;
