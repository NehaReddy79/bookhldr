const Book = require('../models/Book');
const express = require("express");
const router = express.Router();


router.get('/',async (req, res)=> {
    try{
        const books = await Book.find();
        res.json(books);

    }catch(err){
        res.status(500).json({message : err.message});
    }
});

router.get('/search/:query', async (req, res) => {
    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: req.params.query, $options: 'i' } },
                { author: { $regex: req.params.query, $options: 'i' } },
                { category: { $regex: req.params.query, $options: 'i' } }
            ]
        });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req,res)=> {
    try{
        const book = await Book.findById(req.params.id);
        if(!book) return res.status(404).json({message : 'Book not found'});
        res.json(book);
    }catch(err){
        res.status(500).json({message : err.message});
    }
});

router.post('/', async (req,res) =>{
    const book = new Book(req.body);
    try{
        const newBook = await book.save();
        res.status(201).json(newBook);

    }catch(err){
        res.status(400).json({message : err.message});
    }
});

router.delete('/:id', async (req,res) =>{
    try{

        await Book.findByIdAndDelete(req.params.id);
        res.json({message : 'Book deleted'});

    }catch(err){
        res.status(500).json({message : err.message});
    }
})





module.exports = router;