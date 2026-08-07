import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';


function Home() {
    const navigate = useNavigate();

    const name = localStorage.getItem('loggedInUser');
    const email = localStorage.getItem('loggedInEmail');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInEmail');
        handleSuccess('User Loggedout') ;     
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f4f4f4'
            }}
        >
            <div
                style={{
                    width: '450px',
                    padding: '30px',
                    borderRadius: '10px',
                    backgroundColor: '#fff',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    textAlign: 'center'
                }}
            >
                <h1>Welcome 🎉</h1>

                <h2>{name}</h2>

                <p>
                    <strong>Email:</strong> {email}
                </p>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Home;