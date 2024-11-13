import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Reference for dropdown to handle clicks outside

    // Check if the user is logged in based on token
    const isLoggedIn = () => localStorage.getItem('token') !== null;

    // Navigate to login page
    const handleLoginClick = () => {
        navigate('/login');
    };

    // Handle logout and remove token
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Close dropdown if clicked outside
    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsProfileDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="w-full py-4 px-8 flex justify-between items-center bg-violet-800 dark:bg-violet-900 shadow-md fixed top-0 left-0 z-50">
            {/* Logo */}
            <div
                onClick={() => navigate('/')}
                className="text-base sm:text-lg md:text-2xl font-bold text-white cursor-pointer hover:text-violet-300 dark:hover:text-violet-400 transition-colors duration-300"
                role="button"
                aria-label="Navigate to Home"
            >
                🌐 Stranger Chat
            </div>

            {/* Menu for larger screens */}
            <div className="hidden md:flex items-center space-x-6">
                <Link
                    to="/"
                    className="text-white border border-transparent px-3 py-2 rounded-md hover:bg-violet-600 hover:border-violet-600 dark:hover:bg-violet-800 dark:hover:border-violet-800 transition-all duration-300"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="text-white border border-transparent px-3 py-2 rounded-md hover:bg-violet-600 hover:border-violet-600 dark:hover:bg-violet-800 dark:hover:border-violet-800 transition-all duration-300"
                >
                    About
                </Link>
                <Link
                    to="/services"
                    className="text-white border border-transparent px-3 py-2 rounded-md hover:bg-violet-600 hover:border-violet-600 dark:hover:bg-violet-800 dark:hover:border-violet-800 transition-all duration-300"
                >
                    Services
                </Link>
                <Link
                    to="/security"
                    className="text-white border border-transparent px-3 py-2 rounded-md hover:bg-violet-600 hover:border-violet-600 dark:hover:bg-violet-800 dark:hover:border-violet-800 transition-all duration-300"
                >
                    Security
                </Link>
            </div>

            {/* Login/Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
                {isLoggedIn() ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="bg-gray-300 text-black px-6 py-2 rounded-full border border-gray-500 hover:bg-violet-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-violet-600 transition-all duration-300 transform hover:scale-105"
                            aria-label="Profile"
                        >
                            👤 Profile
                        </button>
                        {isProfileDropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    View Profile
                                </Link>
                                <button
                                    onClick={handleLogoutClick}
                                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        className="bg-gray-300 text-black px-6 py-2 rounded-full border border-gray-500 hover:bg-violet-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-violet-600 transition-all duration-300 transform hover:scale-105"
                        aria-label="Login"
                    >
                        🔑 Login
                    </button>
                )}
            </div>

            {/* Mobile menu toggle button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-violet-300 dark:hover:text-violet-400 transition-colors duration-300"
                aria-label="Toggle Navigation Menu"
            >
                ☰
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full right-0 w-[25%] bg-violet-800 dark:bg-violet-900 shadow-lg mt-2 p-4 z-[1000] rounded-lg">
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <Link to="/" className="nav-link-mobile">Home</Link>
                        <Link to="/about" className="nav-link-mobile">About</Link>
                        <Link to="/services" className="nav-link-mobile">Services</Link>
                        <Link to="/security" className="nav-link-mobile">Security</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;













