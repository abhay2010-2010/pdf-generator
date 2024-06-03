const express = require("express");
const Books = require("../schema/pdf.schema");
const { getbook, addbook, updatebook, deletebook } = require("../controllers/book");
const { auth } = require("../middlewares/auth");
const { access } = require("../middlewares/access");
const bookRoute = express.Router();

// bookRoute.get("/",()=>{
//     console.log("hello");
// });
bookRoute.get("/", auth,access("user"), getbook);

bookRoute.post("/add", auth, access("user"), addbook);

bookRoute.patch("/:id", auth, access("user"), updatebook);

bookRoute.delete("/:id", auth, access("user"), deletebook);

module.exports = bookRoute;