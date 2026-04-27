import './MyBooks.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function MyBooks() {
    const [myBooks, setMyBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signIn');
            return;
        }

        fetch('http://localhost:5000/myBooks', {
            headers: { authorization: token }
        })
            .then(res => res.json())
            .then(data => {
                setMyBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const updateStatus = async (myBookId, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/myBooks/${myBookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                setMyBooks(myBooks.map(book =>
                    book._id === myBookId ? { ...book, status: newStatus } : book
                ));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removeBook = async (myBookId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/myBooks/${myBookId}`, {
                method: 'DELETE',
                headers: { authorization: token }
            });

            if (res.ok) {
                setMyBooks(myBooks.filter(book => book._id !== myBookId));
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="mybooks-page">
            <h1 className="mybooks-title">My Books</h1>
            {loading ? (
                <p className="mybooks-loading">Loading...</p>
            ) : myBooks.length === 0 ? (
                <p className="mybooks-empty">You haven't saved any books yet!</p>
            ) : (
                <div className="mybooks-grid">
                    {myBooks.filter(item => item.bookId !== null ).map((item) => (
                        <div key={item._id} className="mybooks-card">
                            <img src={item.bookId.img} alt={item.bookId.title} onClick={() => navigate(`/book/${item.bookId._id}`)} />
                            <p className="mybooks-book-title">{item.bookId.title}</p>
                            <p className="mybooks-author">{item.bookId.author}</p>
                            <span className="mybooks-status" style={{
                                backgroundColor:
                                    item.status === 'reading' ? '#e67e22' :
                                    item.status === 'completed' ? '#27ae60' :
                                    '#2980b9'
                            }}>
                                {item.status === 'wantToRead' ? 'Want to Read' :
                                 item.status === 'reading' ? 'Reading' : 'Completed'}
                            </span>
                            <select
                                className="mybooks-select"
                                value={item.status}
                                onChange={(e) => updateStatus(item._id, e.target.value)}
                            >
                                <option value="wantToRead">Want to Read</option>
                                <option value="reading">Reading</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button className="mybooks-remove-btn" onClick={() => removeBook(item._id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}