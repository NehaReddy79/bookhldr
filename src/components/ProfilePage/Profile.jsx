import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Profile() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const [stats, setStats] = useState({
        total: 0,
        reading: 0,
        completed: 0,
        wantToRead: 0
    });

    useEffect(() => {
        if (!token) {
            navigate('/signIn');
            return;
        }

        fetch('https://bookhldr-production.up.railway.app/myBooks', {
            headers: { authorization: token }
        })
            .then(res => res.json())
            .then(data => {
                const validBooks = data.filter(item => item.bookId !== null);
                setStats({
                    total: validBooks.length,
                    reading: validBooks.filter(item => item.status === 'reading').length,
                    completed: validBooks.filter(item => item.status === 'completed').length,
                    wantToRead: validBooks.filter(item => item.status === 'wantToRead').length
                });
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="profile-page">
            <div className="profile-container">

                <div className="profile-avatar">
                    {username ? username[0].toUpperCase() : '?'}
                </div>
                <h1 className="profile-username">{username}</h1>
                <p className="profile-member">Member of BookHlder</p>

                <div className="profile-stats">
                    <div className="stat-box">
                        <span className="stat-number">{stats.total}</span>
                        <span className="stat-label">Total Books</span>
                    </div>
                    <div className="stat-box reading">
                        <span className="stat-number">{stats.reading}</span>
                        <span className="stat-label">Reading</span>
                    </div>
                    <div className="stat-box completed">
                        <span className="stat-number">{stats.completed}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat-box want">
                        <span className="stat-number">{stats.wantToRead}</span>
                        <span className="stat-label">Want to Read</span>
                    </div>
                </div>

                <div className="profile-buttons">
                    <button className="profile-btn" onClick={() => navigate('/myBooks')}>
                        📚 My Books
                    </button>
                    <button className="profile-btn logout" onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        navigate('/signIn');
                    }}>
                        🚪 Logout
                    </button>
                </div>

            </div>
        </div>
    );
}