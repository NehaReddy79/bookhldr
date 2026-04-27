const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/Book');

const categories = [
    { id: 'romance', query: 'romance novel bestseller' },
    { id: 'mystery', query: 'mystery thriller bestseller' },
    { id: 'horror', query: 'horror novel bestseller' },
    { id: 'science-fiction', query: 'science fiction bestseller' },
    { id: 'biography', query: 'biography memoir bestseller' },
    { id: 'true-crime', query: 'true crime bestseller' },
    { id: 'young-adult', query: 'young adult fiction bestseller' },
];

async function fetchBooks(category, maxResults = 50) {
    const books = [];
    const batchSize = 40;

    for (let startIndex = 0; startIndex < maxResults; startIndex += batchSize) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(category.query)}&startIndex=${startIndex}&maxResults=${batchSize}&langRestrict=en&printType=books&orderBy=relevance&filter=paid-ebooks`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data.items) break;

        data.items.forEach(item => {
            const info = item.volumeInfo;
            const publishedYear = parseInt(info.publishedDate?.split('-')[0]);

            if (
                info.imageLinks?.thumbnail &&
                info.description &&
                publishedYear >= 2015
            ) {
                books.push({
                    title: info.title,
                    author: info.authors? info.authors.join(', ') : 'Unknown',
                    category: category.id,
                    img: info.imageLinks.thumbnail.replace('http://', 'https://').replace('zoom=1', 'zoom=3'),
                    description: info.description,
                    rating: info.averageRating || 0
                });
            }
        });
    }

    return books;
}

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Book.deleteMany();
        console.log('Cleared existing books');

        for (const category of categories) {
            console.log(`Fetching ${category.id} books...`);
            const books = await fetchBooks(category);
            await Book.insertMany(books);
            console.log(`✅ ${books.length} ${category.id} books added!`);
        }

        console.log('All books seeded!');
        mongoose.connection.close();
    })
    .catch(err => console.error(err));