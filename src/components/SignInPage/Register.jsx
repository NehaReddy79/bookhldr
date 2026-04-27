import './SignIn.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await fetch('https://bookhldr-production.up.railway.app/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }

            alert('Account created! Please sign in.');
            navigate('/signIn');

        } catch (err) {
            setError('Something went wrong. Try again.');
        }
    };

    return (
        <div className="sign-page">
            <div className="sign-container fade-in">
                <div className="sign-image">
                    <img src="/images/download (4).jpg" className="sign-des-img" />
                </div>
                <div className="sign-content">
                    <h3>BOOKHLDER</h3>
                    <input
                        type="text"
                        placeholder="Username"
                        className="sign-text-box"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="sign-text-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="sign-pass-box"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
                    <button className="sign-btn" onClick={handleRegister}>Register</button>
                    <p style={{ color: 'white', fontSize: '13px', marginTop: '10px' }}>
                        Already have an account?{' '}
                        <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/signIn')}>
                            Sign In
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

