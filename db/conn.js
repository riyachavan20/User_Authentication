const mongoose = require("mongoose");

// connecting with the db
const DB = "mongodb://127.0.0.1:27017/Authusers";


mongoose.set('strictQuery', false); 

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => {
    console.log("Database Connected");
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});


  
