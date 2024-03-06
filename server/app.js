
const keysecret = "arqfgstrafrwthkjiugthvfdckigtcft"
const express = require("express");
const session = require("express-session");
const app = express();
const FRONTEND_URL=process.env.FRONTEND_URL
require("../db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8000;
const path = require("path");  
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});


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
