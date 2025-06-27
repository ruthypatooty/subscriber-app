import { DataTypes, Model, Optional } from "sequelize";
import { sqlInstance } from "../config/database";
import { SubscriberEnum } from "../../shared/enum/statusEnum";

interface Level1Attributes{
    subscriberId:number;
    subscriberName: string;
    status: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Level1CreateAttributes extends Optional<Level1Attributes,'subscriberId' | 'createdAt' | 'updatedAt'>{}

class Level1 extends Model<Level1Attributes,Level1CreateAttributes> implements Level1Attributes{
    public subscriberId!: number;
    public subscriberName!: string;
    public status!: SubscriberEnum;

    public createdAt?: Date | undefined;
    public updatedAt?: Date | undefined;
}

Level1.init({
    subscriberId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    subscriberName:{
        type:DataTypes.STRING,
        allowNull: false,
        
    },
    status:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
},{
    sequelize: sqlInstance,
    tableName: 'firstLevelApprover',
    timestamps:true,
    modelName:'Level1',
});

export default Level1;