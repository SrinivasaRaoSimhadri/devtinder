const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.use("/users/login", (req, res, next)=>{
    res.send("logging the user");
})
app.use("/users", userAuth, (req, res, next) => {
    res.send("responce from users")
})

app.get("/admin/get-all-users", (req, res, next) => {
    res.send("getting all users data");
})

app.post("/admin/post-user", (req, res, next) => {
    res.send("posting the user data");
})

app.listen(3000, ()=> {
    console.log("The server is running at port 3000 successfully")
});