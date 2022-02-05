const router=require('express').Router()
const{
    formController,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}=require('../controller/formController')

router.post('/',formController)
router.get('/',getAllUser)
router.get('/:id',getSingleUser)
router.put('/:id',updateUser)
router.get('/delete/:id',deleteUser)
module.exports=router