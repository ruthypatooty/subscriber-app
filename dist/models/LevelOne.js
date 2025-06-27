"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Level1 extends sequelize_1.Model {
}
Level1.init({
    subscriberId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    subscriberName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.sqlInstance,
    tableName: 'firstLevelApprover',
    timestamps: true,
    modelName: 'Level1',
});
exports.default = Level1;
