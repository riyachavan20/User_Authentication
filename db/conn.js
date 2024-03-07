const mongoose = require("mongoose");

// Loading environment variables
require('dotenv').config();

// Extracting the DATABASE variable from the environment
const DB = process.env.DATABASE;

mongoose.set('strictQuery', false);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
