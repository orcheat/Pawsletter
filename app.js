const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("static"));
app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
 apiKey: "e3fe3c5e131077bea262ff3e2c8f7552-us18",
 server: "us18"
});
app.post("/", function (req,res) {
const firstName = req.body.firstName;
const secondName = req.body.secondName;
const email = req.body.email;
const listId = "b87d7b3839";
const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

// e3fe3c5e131077bea262ff3e2c8f7552-us18
// b87d7b3839