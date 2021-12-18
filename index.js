const express=require('express')
const { status } = require('express/lib/response')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api',(req,res)=>{
    res.json({
        message:'This is the a landing page'
    })
})
app.post('/api/posts', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey',(err, authData)=>{
        if(err){
            res.sendStatus(403)
            console.log("inside errors");
        }else{
            console.log("inside post");
            res.json({
                message:'POST created...',
                authData
            })
        }
    })
})
app.post('/api/login', (req,res)=>{
    //Mock user
    const user ={
        id:1,
        userName:'Tom',
        email:'tom@test.com'
    }
    jwt.sign({user}, 'secretkey',{ expiresIn:'40s' },(err, token)=>{
      if(err) console.log(message.err)
        res.json({token})
    })
})
//FORMAT TOKEN
//Authorization: Bearer <access_token>

// function for verification
function verifyToken(req, res, next){
    //get auth in header
    const bearerHeader = req.headers['authorization']
    //check if undefind
    if(typeof bearerHeader !== 'undefined'){
        //split at space
        const bearer = bearerHeader.split(' ')
        //get token from array
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        next()
    }else{
        //forbiden entry
        res.sendStatus(403)
    }
}
app.listen(3000,()=>console.log("listening on 3000"))