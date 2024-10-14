const express = require("express");
const ConnectDB  = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


const Start = async () => {
    try {
        await ConnectDB();
        app.listen(3000, ()=> {
            console.log("The server is running at port 3000 successfully!")
        });
    }catch(error) {
        console.log(error);
    }
}
Start();