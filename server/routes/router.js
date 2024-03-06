const express = require("express");
const router = new express.Router();
const table = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");


// user registration

router.post("/register", async (req, res) => {

    const { fname, email, password, cpassword } = req.body; //destructing the req body and fetching respective field's value

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" }) //applying validations from back-end
    }

    try {

        const preuser = await table.findOne({ email: email }); //checking for duplicate email registrations

        if (preuser) {
            res.status(422).json({ error: "This Email already exists" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password do Not Match" })
        } else {
            const finalUser = new table({   //adding a new document in the users collection
                fname, email, password, cpassword  //passing the fields with respective values(after passing flow enters the userSchema to check if the email is actually valid and hashes the password before saving the document)
            });

            // here password hashing

            const storeData = await finalUser.save();
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("Something went wrong!");
    }

});




// user Login

router.post("/login", async (req, res) => {

    const { email, password } = req.body; //destructing the req body and fetching respective field's value

    if (!email || !password) {   //applying validations from back-end
        res.status(422).json({ error: "fill all the details" })
    }

    try {
        const userValid = await table.findOne({ email: email });  // checking if the entered email matches the registered email and if it does fetching the registered user
        if (userValid) {

            const isMatch = await bcrypt.compare(password, userValid.password); //if matches, comparing the password entered during login and the password already saved in the db

            if (!isMatch) {
                res.status(422).json({ error: "invalid details" })
                console.log("error");
            }
            else {


                // token generate
                // if password matches then generates the token. Now flow goes to userSchema and searches for method generateAuthtoken
                const token = await userValid.generateAuthtoken();  // fetching the toen returned by the method generateAuthtoken

                // Store user information in the session
                req.session.user = {
                    _id: userValid._id,
                    email: userValid.email,
                };

                // cookiegenerate
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true //can only be modified by the server side and not by the client side for achieving security
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({ status: 201, result })

            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("Something went wrong!");
    }
});



// valid user
router.get("/validuser", authenticate, async (req, res) => {  //control goes to middleware to verify the token with the secret key which we provided before displaying the dashboard to the user
    try {
        const ValidUserOne = await table.findOne({ _id: req.userId });  //finding the user through req.userId
        res.status(201).json({ status: 201, ValidUserOne });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});


// user logout

router.get("/logout", authenticate, async (req, res) => { //control goes to middleware to verify the token with the secret key which we provided before logging out the user
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {  //filtering out user token from the array
            return curelem.token !== req.token
        });

        // Destroy the session
        req.session.destroy();

        //clearing the cookie
        res.clearCookie("usercookie", { path: "/" });

        req.rootUser.save();

        res.status(201).json({ status: 201 })

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
})


module.exports = router;




