const express = require('express');
const app = express();
const BillApi = require('./route/bill.js');
const UserApi = require('./route/user.js');
const moment = require('moment')
const mongoose = require('mongoose');

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/billingSystem',
{useNewUrlParser: true,useUnifiedTopology: true}
);


const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('opening')
    console.log('before==>', moment(new Date()).subtract(1,'year') );
    console.log('after==>',new Date() )

})


app.use('/api/user',UserApi);
app.use('/api/billing',BillApi);

var PORT =5000
app.listen(PORT,()=>{
    console.log("server is running on port=>",PORT)
})