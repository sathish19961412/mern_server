const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const UserModel=require('./models/Users')
const swaggerJSDoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')

const app=express()

const options = {
    definition: {
        openapi :'3.0.0',
        info:{
            title: 'NodeJs API  Project for Mongodb',
            version:'1.0.0'
        },
        servers:[
            {
                url:'http://localhost:3001/'
            }
        ]
    },
    apis:['./index.js']
}

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crud")

//Swagger Docs
const swaggerSpec=swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

//Display Data
app.get('/',(req,res)=>{

    UserModel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))

})

//Edit Data
app.get('/getUser/:id',(req,res)=>{

   const id =req.params.id;

   UserModel.findById({_id:id})
   .then(users=>res.json(users))
   .catch(err=>res.json(err))
})

//Update Data
app.put('/updateUser/:id',(req,res)=>{

    const id =req.params.id;

    UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))

})

//Post Data
app.post('/createUser',(req,res)=>{

    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))

})

//Delete Data
app.delete('/deleteUser/:id',(req,res)=>{

    const id =req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))

})

app.listen(3001,()=>{
    console.log('Server is Running')
})