
const keysecret = "arqfgstrafrwthkjiugthvfdckigtcft"
const express = require("express");
const session = require("express-session");
const app = express();
const BASE_URL=process.env.BASE_URL
require("../db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Add session middleware
app.use(
  session({
    secret:  keysecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(router);

app.listen(port, () => {
  console.log(`Server started at port no: ${port}`);
});
