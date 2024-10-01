import React from 'react';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <div className="flex-grow">
                <h1 className="text-5xl font-bold mb-12 text-center">About Us</h1>

                <section className="max-w-5xl mx-auto px-6 mb-12 text-center">
                    <h2 className="text-4xl font-semibold mb-6">Our Mission</h2>
                    <p className="text-lg leading-relaxed">
                        We are a global chat platform that connects people from different parts of the world. Our mission is to provide a secure, anonymous, and engaging environment where users can freely communicate with strangers, make new connections, and broaden their horizons.
                    </p>
                </section>

                <section className="max-w-5xl mx-auto px-6 mb-12 bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-4xl font-semibold mb-6">Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: 'Security', description: 'We prioritize the safety and privacy of our users.' },
                            { title: 'Inclusivity', description: 'We welcome users from all backgrounds and cultures.' },
                            { title: 'Engagement', description: 'We encourage meaningful conversations and connections.' },
                            { title: 'Innovation', description: 'We continually improve our platform to enhance user experience.' },
                        ].map((value, index) => (
                            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                                <p className="text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-5xl mx-auto px-6 mb-12 text-center">
                    <h2 className="text-4xl font-semibold mb-6">Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: 'Anonymous Chatting', description: 'Connect with strangers without revealing your identity for a secure chatting experience.' },
                            { title: 'User-Friendly Interface', description: 'Our intuitive interface ensures a seamless experience for all users.' },
                            { title: 'Real-Time Messaging', description: 'Engage in real-time conversations for immediate interaction and connection.' },
                            { title: 'Community Moderation', description: 'We have dedicated moderators to ensure a safe and respectful environment.' },
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <footer className="bg-gray-800 w-full text-center p-4">
                <p className="text-sm">&copy; 2024 ChatPlatform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;







