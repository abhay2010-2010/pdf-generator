const express=require("express");
const { dbConnection } = require("./config/user.config");
const cors=require("cors");
const { userRoutes } = require("./routes/users.route");
const app=express();

app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use('/pdf',userRoutes)

app.listen(8080,async()=>{
    try {
        await dbConnection;
        console.log("Database is connected");
        console.log("Server is running on port 3000");
    } catch (error) {
        console.log(error);
    }
    
});