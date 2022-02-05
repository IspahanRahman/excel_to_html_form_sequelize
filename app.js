const express=require('express')
const fileUpload = require('express-fileupload');
const formroute=require('./route/formroute')
const setMiddleware=require('./middleware/middleware')
const excelRoute=require('./route/course_excel_route')
const port=8080
const app=express()

require('./config/database')
app.set('view engine','ejs')
app.set('views','views')
setMiddleware(app)
app.use(express.static('public'))
app.use(fileUpload());

// app.get('/',(req,res)=>{
//     res.render('dynamic_form_add',{users,error:{}})
// })

app.use('/save',formroute)
app.use('/excel',excelRoute)


//app.delete('/save/delete/:id',deleteUser)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})