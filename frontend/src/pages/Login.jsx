import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError('Email and password are required!');
        }

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
            });

            const result = await response.json();
            console.log("Login Response:", result);

            const { success, message, jwtToken, name } = result;

            if (success) {
                handleSuccess(message);

                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('loggedInEmail', email);

                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                handleError(message);
            }

        } catch (err) {
            console.error(err);
            handleError('Unable to connect to server');
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={loginInfo.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={loginInfo.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Login</button>

                <span>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </span>
            </form>

            <ToastContainer />
        </div>
    );
}

export default Login;