require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./src/configs/db");
const UserRouter = require("./src/routes/user.routes");
const BookRouter = require("./src/routes/book.routes");

const app = express();
const port =  3000;

app.use(express.json());
const corsOptions = {
    origin: '*',
  };
  
  app.use(cors(corsOptions));

app.use("/users", UserRouter);
app.use("/books", BookRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, async () => {
  try {
    await connectToDB;
    console.log("Connected to database successfully");
    console.log(`Server is running at http://localhost:${port}`);
  } catch (err) {
    console.log("Error connecting to the database: ", err.message);
  }
});
