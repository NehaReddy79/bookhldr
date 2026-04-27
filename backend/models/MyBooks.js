const mongoose  = require('mongoose');

const myBooksSchema = new mongoose.Schema({

    userId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
    bookId : { type : mongoose.Schema.Types.ObjectId, ref : 'Book', required : true },
    status : {type : String, enum : ['reading', 'completed', 'wantToRead'], default : 'wantToRead'}
});

module.exports = mongoose.model('MyBooks', myBooksSchema);