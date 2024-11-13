import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const API_BASE_URL = 'https://chatapp-8fgd.onrender.com/api';

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setNewUsername(storedUser.username);
        } else {
            navigate('/login'); // Redirect to login if no user is found
        }
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const updateData = {
            currentPassword,
            newUsername,
            newPassword,
        };

        try {
            const response = await axios.patch(
                `${API_BASE_URL}/auth/update/${user._id}`, 
                updateData, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setSuccess(response.data.message);
            setCurrentPassword('');
            setNewPassword('');
            // Update the user data in local storage after successful update
            const updatedUser = response.data.user;
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'Failed to update profile';
            setError(errorMessage);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            try {
                await axios.delete(
                    `${API_BASE_URL}/auth/delete/${user._id}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                alert('Account deleted successfully.');
                localStorage.clear(); // Clear localStorage on account deletion
                navigate('/signup');
            } catch (err) {
                const errorMessage = err.response?.data?.error || err.message || 'Failed to delete account';
                setError(errorMessage);
            }
        }
    };

    if (!user) return null; // Render nothing if user is not loaded

    return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded mt-32">
            <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}

            <div className="mb-4">
                <img
                    src={user.profilePic || 'default-profile-pic-url.jpg'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-2"
                />
            </div>

            <form onSubmit={handleUpdate} className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Current Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">New Username</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">New Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Update Profile
                </button>
            </form>

            <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 text-white py-2 rounded"
            >
                Delete Account
            </button>
        </div>
        </div>
    );
};

export default ProfilePage;


