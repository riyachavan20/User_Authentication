const mongoose = require("mongoose");
const DATABASE=process.env.DATABASE
// connecting with the db
const DB = DATABASE;


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


  
