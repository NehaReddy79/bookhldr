const express = require('express');
const router = express.Router();
const MyBooks = require('../models/MyBooks');
const jwt = require('jsonwebtoken');

const verifyToken  = (req, res, next) =>{
    const token = req.headers['authorization'];

    if(!token) return res.status(401).json({message : 'Unauthorized' });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch(err){
        res.status(401).json({message : 'Invalid token'});
    }

};

router.get('/', verifyToken, async (req, res)=>{
    try{
        const books = await MyBooks.find({userId : req.userId}).populate('bookId');
        res.json(books);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const { bookId, status } = req.body;

        console.log('userId:', req.userId);
        console.log('bookId:', bookId);

        const existing = await MyBooks.findOne({ 
            userId: req.userId, 
            bookId: bookId 
        });
        
        console.log('existing:', existing);

        if (existing) {
            return res.status(400).json({ message: 'Book already saved' });
        }

        const myBook = new MyBooks({ userId: req.userId, bookId, status });
        await myBook.save();
        res.status(201).json(myBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updated = await MyBooks.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await MyBooks.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;