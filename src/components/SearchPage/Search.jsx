import './Search.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function Search() {
    const { query } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/books/search/${query}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [query]);

    return (
        <div className="search-page">
            <h1 className="search-title">Results for "{query}"</h1>
            {loading ? (
                <p className="search-loading">Searching...</p>
            ) : books.length === 0 ? (
                <p className="search-empty">No books found for "{query}"</p>
            ) : (
                <div className="search-grid">
                    {books.map((book) => (
                        <div key={book._id} className="search-card" onClick={() => navigate(`/book/${book._id}`)}>
                            <img src={book.img} alt={book.title} />
                            <p className="search-book-title">{book.title}</p>
                            <p className="search-author">{book.author}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}