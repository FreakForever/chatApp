import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Make login request to your API
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                username,
                password,
            });

            // Extract the token and user from the response
            const { token, user } = response.data;

            // Save the token and user in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect to the chat page
            navigate('/chat');
        } catch (err) {
            // Handle error (e.g., wrong credentials or server issues)
            setError(
                err.response?.data?.message || 'An error occurred. Please try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>

                {/* Display error message */}
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="border border-gray-600 bg-gray-700 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="border border-gray-600 bg-gray-700 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                    />

                    {/* Show a loading spinner when submitting */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-600 text-white p-3 w-full rounded-lg font-semibold hover:bg-blue-700 transition-colors ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-400 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;







