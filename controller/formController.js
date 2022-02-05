const db=require('../config/database')
const User=db.users
exports.formController=async(req,res,next)=>{
    try{
        let arr=[];
        let input_user={}
       for(let i=0;i<req.body.txtFullname.length;i++){
        input_user['txtFullname']=req.body.txtFullname[i];
        input_user['txtEmail']=req.body.txtEmail[i];
        input_user['txtPhone']=req.body.txtPhone[i];
        input_user['txtAddress']=req.body.txtAddress[i];
        arr.push(input_user)
        input_user={}
    }
    
    let result=await User.bulkCreate(arr)
    if(result){
        console.log(result)
    }
    }catch(e){
        console.log(e)
        next(e)
    }
    res.redirect('/save')
}
exports.getAllUser=(req,res)=>{
    User.findAll({
        order: [
            ['id', 'ASC'],
            
        ],
        attributes: ['id', 'txtFullname', 'txtEmail', 'txtPhone','txtAddress','createdAt', 'updatedAt']
    })
    .then(users=>{
        res.render('dynamic_form_add',{users,error:{}})
    })
    .catch(e=>{
        console.log(e)
        res.json({
            message:'Error occurred'
        })
    })
}
exports.getSingleUser=(req,res)=>{
   console.log(req.params.id)
    User.findOne({
        where:{
            id:req.params.id
        },
        order: [ [ 'id', 'ASC' ]],
    })
    .then(user=>{

        res.json(user)
    })
    .catch(e=>{
        console.log(e)
        res.json({
            message:'Error occurred'
        })
    })
}

exports.updateUser=(req,res)=>{
    let {txtFullname,txtEmail,txtPhone,txtAddress}=req.body
    let {id}=req.params

    User.update({
        where:{
            id:id
        },
        $set:{
            txtFullname,txtEmail,txtPhone,txtAddress
        },
      
    })
    .then(user=>{
        res.json(contact)
    })
    .catch(e=>{
        console.log(e)
        res.json({
            message:'Error occurred'
        })
    })
}

exports.deleteUser=(req,res)=>{
    let{id}=req.params
    User.destroy({
        where:{
            id:id
        }
    })
        .then(()=>{
        User.findAll()
        .then(users=>{
            res.redirect('/save')

        })
       
    })
    .catch(e=>{
        console.log(e)
        res.json({
            message:'Error occurred'
        })
    })

}
