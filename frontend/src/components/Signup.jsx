import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });
    const [success, setSuccess] = useState(false); // State for success notification
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false); // Reset success state on form submission
        setError(null); // Reset error state on form submission

        try {
            const response = await axios.post('http://localhost:8000/api/auth/signup', formData, {
                withCredentials: true // Ensure cookies (e.g., JWT token) are passed
            });

            if (response.status === 201) {
                setSuccess(true); // Set success state to true
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            setError(error.response?.data || error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Sign Up</h2>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        <p>Signup successful! Redirecting to login...</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p>{error}</p>
                    </div>
                )}

                {/* Form Fields */}
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="border border-gray-600 bg-gray-700 text-white p-3 mb-4 w-full rounded-lg focus:outline-none focus:border-indigo-500"
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="border border-gray-600 bg-gray-700 text-white p-3 mb-4 w-full rounded-lg focus:outline-none focus:border-indigo-500"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="border border-gray-600 bg-gray-700 text-white p-3 mb-4 w-full rounded-lg focus:outline-none focus:border-indigo-500"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                    className="border border-gray-600 bg-gray-700 text-white p-3 mb-4 w-full rounded-lg focus:outline-none focus:border-indigo-500"
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="border border-gray-600 bg-gray-700 text-white p-3 mb-4 w-full rounded-lg focus:outline-none focus:border-indigo-500"
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                
                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-indigo-600 text-white p-3 rounded-lg w-full hover:bg-indigo-700 transition-colors"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;



