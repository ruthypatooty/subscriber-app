import { DataTypes, Model } from "sequelize";
import { sqlInstance } from "../config/database";
class User extends Model {
}
User.init({
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subscriberName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    sequelize: sqlInstance,
    tableName: 'users',
    timestamps: true,
    modelName: 'User',
});
export default User;
//# sourceMappingURL=Users.js.map