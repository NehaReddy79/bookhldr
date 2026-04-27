import './BookDetail.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function BookDetail(){

    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{

        fetch(`https://bookhldr-production.up.railway.app/books/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data);
                setLoading(false);
            })
            .catch(err =>{
                console.log(err);
                setLoading(false);
            });
    },[id]);

    const saveBook = async () => {

        const token = localStorage.getItem('token');
        if(!token){
            alert('Please sign in to save books!');
            navigate('/signIn');
            return;
        }

        try{

            const res  = await fetch('https://bookhldr-production.up.railway.app/myBooks',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    authorization : token
                },
                body : JSON.stringify({ bookId : id, status : 'wantToRead'})
                
            });

            const data = await res.json();
            if(res.ok){
                alert('Book saved!');
            }   else{
                alert(data.message);
            }

        }catch(err){
            console.log(err);
        }
    };


    if(loading) return <p className = "detail-loading">Loading...</p>;
    if(!book) return <p className = "detail-loading">Book not found!</p>;


    return(

        <div className="detail-page">
            <button className="detail-back" onClick={() => navigate(-1)}>← Back</button>
            <div className="detail-container">
                <div className="detail-image">
                    <img src={book.img} alt={book.title} />
                </div>
                <div className="detail-info">
                    <h1 className="detail-title">{book.title}</h1>
                    <h3 className="detail-author">by {book.author}</h3>
                    <span className="detail-category">{book.category}</span>
                    <p className="detail-description">
                        {book.description || 'No description available.'}
                    </p>
                    <button className="detail-save-btn" onClick={saveBook}>+ Save to My Books</button>
                </div>
            </div>
        </div>
    );
}