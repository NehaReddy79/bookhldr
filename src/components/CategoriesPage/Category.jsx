import './Category.css';
import { categories } from './categoryItem';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Category() {

    const [booksByCategory, setBooksByCategory] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://bookhldr-production.up.railway.app/books')
            .then(res => res.json())
            .then(data => {
                
                const grouped = {};
                data.forEach(book => {
                    if (!grouped[book.category]) {
                        grouped[book.category] = [];
                    }
                    grouped[book.category].push(book);
                });
                setBooksByCategory(grouped);
            })
            .catch(err => console.log(err));
    }, []);

    const scrollCat = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth"
        });
    };

    const saveBook = async (bookId, e) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in to save books!');
            return;
        }

        try {
            const res = await fetch('https://bookhldr-production.up.railway.app/myBooks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify({ bookId, status: 'wantToRead' })
            });

            const data = await res.json();
            if (res.ok) {
                alert('Book saved!');
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="cat-container fade-in">
                {categories.map((cat) => (
                    <div key={cat.id} className="cat-box" onClick={() => scrollCat(cat.id)}>
                        <h3 className="cat-title">{cat.title}</h3>
                        <p className="cat-emoji">{cat.emoji}</p>
                    </div>
                ))}
            </div>

            <div className="cat-scroll">
                {categories.map((cat) => (
                    <section key={cat.id} id={cat.id} className="cat-section">
                        <h2 className="section-title">{cat.title}</h2>

                        <div className="hori-scroll">
                            {(booksByCategory[cat.id] || []).map((book) => (
                                <div key={book._id} className="book-card" onClick={() => navigate(`/book/${book._id}`)}>
                                    <img src={book.img} alt={book.title} />
                                    <p className="book-title">{book.title}</p>
                                    <button className="cat-save-btn" onClick={(e) => saveBook(book._id, e)}>+ Save</button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </>
    );
}