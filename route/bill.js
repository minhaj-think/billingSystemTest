const express = require('express');
const BillSchema = require('./../models/bill');
const route = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './uploadFiles' });
const moment = require('moment')
// Create bill
route.post('/addBill',upload.single('billfile'),async (req,res)=>{

try{

    var {billingmonth,duedate,userId,totalAmount} = req.body;
    var {billfile} = req.file;

    var response = await BillSchema({billingmonth,duedate,userId,billfile,totalAmount})

    var result =await response.save()

    if(result){
        res.json({
            status:200,
            message:result
        })
    }

}catch(err){
    res.json({
        status:500,
        message:'Failed'
    })
}

})

// average
route.get('/getAvg',async(req,res)=>{

    try{

        var {userId} = req.body;

        // var response = await BillSchema.find({userId})
        var response = await BillSchema.aggregate([{$group: {_id:userId, avg_val:{$avg:"$totalAmount"}}}])
        
        if(response){
            res.json({
                status:200,
                message:response
            })
        }

    }catch(err){
        res.json({
            status:500,
            message:'Failed'
        })
    }


})


// get all bills
route.post('/getBills',async (req,res)=>{

    try{

        var {userId} = req.body;

        var response = await BillSchema.find({
            userId,
            createdAt: {
                $gte: moment(new Date()).subtract(1,'year'),
                $lte: new Date()
              }
        })
        
        if(response){
            res.json({
                status:200,
                message:response
            })
        }

    }catch(err){
        res.json({
            status:500,
            message:'Failed'
        })
    }
    
    })
    
module.exports = route


// route.post('/addBill',async (req,res)=>{

//     try{
    
//     }catch(err){
//         res.json({
//             status:500,
//             message:'Failed'
//         })
//     }
    
//     })
    