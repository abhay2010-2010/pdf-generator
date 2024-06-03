const express=require("express");
const { dbConnection } = require("./config/user.config");
const cors=require("cors");
const { userRoutes } = require("./routes/users.route");
const bookRoute = require("./routes/book.route");

app.use(cors());
const app=express();

app.use(express.json());



app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use('/pdf',userRoutes);

app.use('/books',bookRoute)

app.listen(8080,async()=>{
    try {
        await dbConnection;
        console.log("Database is connected");
        console.log("Server is running on port 8080");
    } catch (error) {
        console.log(error);
    }
    
});