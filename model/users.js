
module.exports=(sequelize,DataTypes)=>{
    const Users=sequelize.define('users',{
        txtFullname:{
            type:DataTypes.STRING
        },
        txtEmail:{
            type:DataTypes.STRING
        },
        txtPhone:{
            type:DataTypes.STRING
        },
        txtAddress:{
            type:DataTypes.STRING
        }
       
    },{
        timestamps:true
    })
    return Users
}