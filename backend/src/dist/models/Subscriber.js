import { DataTypes, Model } from "sequelize";
import { sqlInstance } from "../config/database";
import { SubscriberEnum } from "@/shared/enum/statusEnum";
class Subscriber extends Model {
}
Subscriber.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subscriberName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: SubscriberEnum.Pending,
    },
    // approverId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
}, {
    sequelize: sqlInstance,
    tableName: 'subscribers',
    timestamps: true,
    modelName: 'Subscriber',
});
export default Subscriber;
//# sourceMappingURL=Subscriber.js.map