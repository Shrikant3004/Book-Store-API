const Book = require("../models/books")

async function submitBooks (req,res){
    try{
        const result = await Book.create({
            ...req.body
        });
        return res.status(201).json({"msg":"Book posted successfully"});
    }
    catch(error){
        console.log("Error creating a book",error);
        return res.json({"msg":"Error creating a book"});

    }
}

async function getBooks (req,res){
    try{
        await Book.find({}).sort({createdAt: -1}).then((books) =>{ //desc order
            return res.status(200).json(books);
        })
        
    }
    catch(error){
        console.log("Error fetching books",error);
        return res.status(500).json({"msg":"Error fetching a books"});

    }
}

async function getOneBook(req,res){
    try {
        const {id} = req.params;
        await Book.findById(id).then((book)=>{
            if(!book){
                return res.status(404).send({message: "Book not Found!"})
            }
            return res.status(200).send(book)
        });
        
        
    } catch (error) {
        console.error("Error fetching a book", error);
        return res.status(500).send({message: "Error fetching a book"})
    }
}

async function updateBook(req,res){
    try {
        const {id} = req.params;
        await Book.findByIdAndUpdate(id, req.body, {new: true}).then((newBook)=>{
            if(!newBook) {
                return res.status(404).send({message: "Book is not Found!"})
            }
            return res.status(200).send({
                message: "Book updated successfully",
                book: newBook
            })
        });
    } catch (error) {
        console.error("Error updating a book", error);
        return res.status(500).send({message: "Error updating a book"})
    }
}

async function deleteBook(req,res){
    try {
        const {id} = req.params;
        await Book.findByIdAndDelete(id).then((deletedBook)=>{
            if(!deletedBook) {
                return res.status(404).send({message: "Book is not Found!"})
            }
            return res.status(200).send({
                message: "Book deleted successfully",
                book: deletedBook
            })
        });
        
    } catch (error) {
        console.error("Error deleting a book", error);
        return res.status(500).send({message: "Failed to delete a book"})
    }
}
module.exports = {submitBooks,getBooks,getOneBook,updateBook,deleteBook}