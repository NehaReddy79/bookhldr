import './TopPicks.css';
import { useNavigate } from 'react-router-dom';

export function TopPicks({ books }) {

    function scroll(direction) {
        const wrp = document.querySelector('.top-wrp');
        const scrlamt = wrp.clientWidth * 0.8;
        wrp.scrollBy({ left: direction * scrlamt, behavior: 'smooth' });
    }

    const navigate = useNavigate();


    const saveBook = async (bookId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in to save books!');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/myBooks', {
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
            <div>
                <h2 className="top-heading">Some Of Our Top Picks</h2>
            </div>
            <div className="top-container">
                <button className="top-but left" onClick={() => scroll(-1)}>◀</button>

                <div className="top-wrp">
                    {books.map((book, index) => (
                        <div key={index} className='top-items' onClick={() => navigate(`/book/${book._id}`)}>
                            <img src={book.img || "https://via.placeholder.com/150"} alt={book.title} />
                            <p className="top-items-title">{book.title}</p>
                            <button className="save-btn" onClick={(e) => {
                                e.stopPropagation();
                                saveBook(book._id);
                            }}>+ Save</button>
                        </div>
                    ))}
                </div>

                <button className="top-but right" onClick={() => scroll(1)}>▶</button>
            </div>
        </>
    );
}