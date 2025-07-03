import { DataTypes, Model, Optional } from "sequelize";
import {sqlInstance} from "../config/database";
import { SubscriberEnum } from "@/shared/enum/statusEnum";


interface SubscriberAttributes {
    id: number;
    subscriberName: string;
    status: number;
    // approverId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface SubscriberCreateAttributes extends Optional<SubscriberAttributes, 'id'| 'createdAt'| 'updatedAt'>{}

class Subscriber extends Model<SubscriberAttributes, SubscriberCreateAttributes> implements SubscriberAttributes{
    public id!:number;
    public subscriberName!: string;
    public status!: SubscriberEnum;
    // public approverId!: number;
    public createdAt?: Date | undefined;
    public updatedAt?: Date | undefined;
}

Subscriber.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    subscriberName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    status:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:SubscriberEnum.Pending,
    },
    // approverId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
},{
    sequelize: sqlInstance,
    tableName:'subscribers',
    timestamps:true,
    modelName:'Subscriber',
});

export default Subscriber;