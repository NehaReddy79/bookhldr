import './ContinueRead.css';
// import { items } from './sampleTopItem';
import { useNavigate } from 'react-router-dom';

export function ContinueRead({books}) {

    const navigate = useNavigate();

    function scroll(direction) {
        const wrp = document.querySelector('.cont-wrp');
        const scrlamt = wrp.clientWidth * 0.8;
        wrp.scrollBy({ left: direction * scrlamt, behavior: 'smooth' });
    }

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
                <h2 className="cont-heading">Continue Reading</h2>
            </div>
            <div className="cont-container">
                <button className="cont-but left" onClick={() => scroll(-1)}>◀</button>

                <div className="cont-wrp">
                    {books.map((book, index) => (
                        <div key={index} className='cont-items' onClick={() => navigate(`/book/${book._id}`)}>
                            <img src={book.img} alt={book.title} />
                            <p className="cont-items-title">{book.title}</p>
                            <button className="cont-save-btn" onClick={(e) => {
                                e.stopPropagation();
                                saveBook(book._id);
                            }}>+ Save</button>
                        </div>
                    ))}
                </div>

                <button className="cont-but right" onClick={() => scroll(1)}>▶</button>
            </div>
        </>
    );
}