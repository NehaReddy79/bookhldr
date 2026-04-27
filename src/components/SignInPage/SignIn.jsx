import './SignIn.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await fetch('https://bookhldr-production.up.railway.app/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }


            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);


            navigate('/');

        } catch (err) {
            setError('Something went wrong. Try again.');
        }
    };

    return (
        <>
            <div className="sign-page">
                <div className="sign-container fade-in">

                    <div className="sign-image">
                        <img src="/images/download (4).jpg" className="sign-des-img" />
                    </div>

                    <div className="sign-content">
                        <h3>BOOKHLDER</h3>
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
                        <button className="sign-btn" onClick={handleLogin}>Sign In</button>


                        <p style={{ color: 'white', fontSize: '13px', marginTop: '10px' }}>
                            Don't have an account?{' '}
                            <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/register')}>
                                Register
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}