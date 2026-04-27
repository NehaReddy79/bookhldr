import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function NavBar() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername && storedUsername !== username) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');
        navigate('/signIn');
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && search.trim()) {
            navigate(`/search/${search}`);
            setSearch('');
        }
    };

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h2>BookHlder</h2>
                </div>

                <input
                    type="text"
                    placeholder="Search books, authors..."
                    className="navbar-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                />

                <div className="navbar-links">
                    <button className="navbar-button" onClick={() => navigate('/')}>Home</button>
                    <button className="navbar-button" onClick={() => navigate('/categories')}>Categories</button>
                    <button className="navbar-button" onClick={() => navigate('/myBooks')}>My Books</button>

                    {username ? (
                        <>
                            <span className="navbar-username">Hi, {username}!</span>
                            <button className="navbar-button" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <button className="navbar-button" onClick={() => navigate('/signIn')}>Sign In</button>
                    )}

                    <button className="navbar-button" onClick={() => navigate('/profile')}>Profile</button>
                </div>
            </div>
        </>
    );
}