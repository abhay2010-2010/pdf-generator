const express = require("express");
const Books = require("../schema/pdf.schema");
const { getbook, addbook, updatebook, deletebook } = require("../controllers/book");
const bookRoute = express.Router();

// bookRoute.get("/",()=>{
//     console.log("hello");
// });
bookRoute.get("/", getbook);

bookRoute.post("/add", addbook);

bookRoute.patch("/:id", updatebook);

bookRoute.delete("/:id",deletebook );

module.exports = bookRoute;