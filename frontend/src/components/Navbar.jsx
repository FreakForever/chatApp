import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isLoggedIn = () => localStorage.getItem('token') !== null;

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

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
                    className="text-white hover:text-violet-300 dark:hover:text-violet-400 border-b-2 border-transparent hover:border-violet-300 dark:hover:border-violet-400 transition-all duration-300 text-lg sm:text-xl"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="text-white hover:text-violet-300 dark:hover:text-violet-400 border-b-2 border-transparent hover:border-violet-300 dark:hover:border-violet-400 transition-all duration-300 text-lg sm:text-xl"
                >
                    About
                </Link>
                <Link
                    to="/services"
                    className="text-white hover:text-violet-300 dark:hover:text-violet-400 border-b-2 border-transparent hover:border-violet-300 dark:hover:border-violet-400 transition-all duration-300 text-lg sm:text-xl"
                >
                    Services
                </Link>
                <Link
                    to="/security"
                    className="text-white hover:text-violet-300 dark:hover:text-violet-400 border-b-2 border-transparent hover:border-violet-300 dark:hover:border-violet-400 transition-all duration-300 text-lg sm:text-xl"
                >
                    Security
                </Link>
            </div>

            {/* Login/Logout Button */}
            <div className="flex-shrink-0">
                {isLoggedIn() ? (
                    <button
                        onClick={handleLogoutClick}
                        className="bg-gray-300 text-black px-5 py-2 rounded-full border border-gray-500 hover:bg-violet-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-violet-600 transition-all duration-300 transform hover:scale-105"
                        aria-label="Logout"
                    >
                        🚪 Logout
                    </button>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        className="bg-gray-300 text-black px-5 py-2 rounded-full border border-gray-500 hover:bg-violet-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-violet-600 transition-all duration-300 transform hover:scale-105"
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
                        <Link
                            to="/"
                            className="text-white hover:text-violet-300 dark:hover:text-violet-400 border-b-2 border-transparent hover:border-violet-300 dark:hover:border-violet-400 transition-all duration-300 text-lg"
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="text-white hover:text-violet-300 dark:hover:text-violet-400 border-b-2 border-transparent hover:border-violet-300 dark:hover:border-violet-400 transition-all duration-300 text-lg"
                        >
                            About
                        </Link>
                        <Link
                            to="/services"
                            className="text-white hover:text-violet-300 dark:hover:text-violet-400 border-b-2 border-transparent hover:border-violet-300 dark:hover:border-violet-400 transition-all duration-300 text-lg"
                        >
                            Services
                        </Link>
                        <Link
                            to="/security"
                            className="text-white hover:text-violet-300 dark:hover:text-violet-400 border-b-2 border-transparent hover:border-violet-300 dark:hover:border-violet-400 transition-all duration-300 text-lg"
                        >
                            Security
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;








