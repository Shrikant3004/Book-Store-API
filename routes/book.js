const express = require("express")
const router = express.Router();
const {submitBooks,getBooks,getOneBook,updateBook,deleteBook} = require("../controller/book")
const {restrictTologinBrowzer,restrictTologin,verifyAdminToken} = require("../middleware/auth");

router.post("/book",verifyAdminToken,submitBooks)
router.get("/book",getBooks)
router.get("/book/:id",getOneBook)
router.patch("/book/:id",verifyAdminToken,updateBook)
router.delete("/book/:id",verifyAdminToken,deleteBook)

module.exports = router;