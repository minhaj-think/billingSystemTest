const mongoose = require('mongoose')

const BillSchema = mongoose.Schema({
    billingmonth:{
        type:String,
        required:true
    },
    duedate:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    billfile:{
        type:String,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    }
    
})

module.exports = mongoose.model('bill',BillSchema)