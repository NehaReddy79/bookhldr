const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require('dotenv').config();

const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
const myBooksRoutes = require('./routes/myBooks');




app.use(cors());
app.use(express.json());
app.use('/books',booksRoutes);
app.use('/auth',authRoutes);
app.use('/mybooks',myBooksRoutes);




app.get('/',(req,res)=>{
    res.send('serever is running');
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected to database');
    app.listen(process.env.PORT, () =>{
        console.log(`server running on posrt ${process.env.PORT}`);
    });
})
.catch(err => console.error('mongodb connection error:', err));