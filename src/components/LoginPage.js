import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/apiService';
import Cookies from 'js-cookie';

function LoginPage() {
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(email, password);
            const token = res.data.token;
            Cookies.set('token', token, { expires: 1 }); 
            navigate('/products');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container mt-5 pt-5" style={{ maxWidth: '400px' }}>
            <div className='card'>
                <div className='card-body'>

                    <h3 className='text-center'>Login</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='text-center'>
                        <button type="submit" className="btn btn-primary w-25">Login</button>
                </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
