const mongoose = require("mongoose");

// const DB = process.env.DATABASE
const DB="mongodb+srv://riyachavan:Duet9445%23@cluster0.smczley.mongodb.net/Authusers?retryWrites=true&w=majority"
mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})