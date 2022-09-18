const express = require('express');
const UserScheam = require('./../models/user');
const route = express.Router();
const bcrypt = require('bcrypt')

// sign up
route.post('/signUp',async(req,res)=>{

    try{

        var {name,email,password,city,country} = req.body;

        if(!email || !password || !name || !city || !country ){
            res.json({
                status:400,
                message:'Please send data completely'
            })    
        }else{

            var salt = 10
            bcrypt.genSalt(salt, function(err, salted) {
                bcrypt.hash(password, salted, async function(err, hash) {
                    // Store hash in your password DB.
                    var response = await UserScheam({
                        name,email,
                        password:hash,
                        city,country,street
                    })  
                    if(response){
                        var result = response.save();
                        console.log('result-->',result)
                        res.json({
                            status:200,
                            message:result
                        })
                    }else{
                        res.json({
                            status:400,
                            message:'There is an error with mongodb'
                        })
                    }
        
                });
            });




        }

    }catch(err){
        res.json({
            status:500,
            message:'Failed'
        })
    }

} )

// sign in
route.post('/login',async(req,res)=>{

try{
    var {email,password} = req.body;

    var findByEmail = await UserScheam.find({email})
    if(!findByEmail){
        res.json({status:400,message:'There is not any user with this email'})
    }else{
        bcrypt.compare(password,findByEmail.password,async(err,res)=>{
            if(err){
                res.json({
                    status:500,
                    message:'Wrong Password'
                })
           
            }else{
                res.json({
                    status:200,
                    message:findByEmail
                })
            }
        })
    }



}catch(err){
    res.json({
        status:500,
        message:'Failed'
    })

}

})

route.get('/getUser:page',async (req,res)=>{

try{
    var {page}  = req.params;

    var response = await UserScheam.find().limit(10).skip(page*10);
    var total = await UserScheam.find();

    if(response){
    res.json({
        status:200,
        message:response,
        pagelength:total.length,
        enties:response.length
    })
}else{
    res.json({
        status:400,
        message:'Failed'
    })

}

}catch(err){
    res.json({
        status:400,
        message:'Failed'
    })
}

})


module.exports = route