import { DataTypes, Model, Optional } from "sequelize";
import { sqlInstance } from "../config/database";
import { SubscriberEnum } from "@/shared/enum/statusEnum";

interface UserAttributes{
    userId:number;
    userName: string;
    password: string;
    userStatus?: number;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    subscriberName?: string;
    role:number;
}

interface UserCreateAttributes extends Optional<UserAttributes,'userId' | 'createdAt' | 'updatedAt' | 'userStatus' | 'updatedBy' | 'subscriberName'>{}

class User extends Model<UserAttributes,UserCreateAttributes> implements UserAttributes{
    public userId!: number;
    public userName!: string;
    password!: string;
    public userStatus?: SubscriberEnum;
    public updatedBy?: string;
    public createdAt?: Date | undefined;
    public updatedAt?: Date | undefined;
    public subscriberName?: string | undefined;
    public role!:number;
}

User.init({
    userId:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    userName:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    subscriberName:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    userStatus:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    updatedBy:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    role:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0,
    }
},{
    sequelize: sqlInstance,
    tableName: 'users',
    timestamps:true,
    modelName:'User',
});

export default User;