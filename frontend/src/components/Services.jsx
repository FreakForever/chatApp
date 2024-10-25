
const Services = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <div className="flex-grow">
                <h1 className="text-5xl font-bold mb-8 text-center">Our Services</h1>
                <p className="text-lg max-w-3xl mx-auto text-center leading-relaxed mb-12">
                    We provide secure and anonymous chat services for users looking to communicate in a private and 
                    protected environment. Our platform allows you to connect with strangers while ensuring your 
                    privacy and anonymity are maintained at all times.
                </p>

                <section className="max-w-5xl mx-auto px-6 mb-12 text-center">
                    <h2 className="text-4xl font-semibold mb-6">Service Offerings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: 'Anonymous Chat Rooms', description: 'Join chat rooms without revealing your identity. Engage in conversations on topics that interest you.' },
                            { title: 'Private Messaging', description: 'Send direct messages to users while maintaining your anonymity and privacy.' },
                            { title: 'Community Moderation', description: 'Enjoy a safe chatting environment with our dedicated moderators ensuring respectful interactions.' },
                            { title: 'User Profiles', description: 'Create profiles that allow you to express yourself without compromising your privacy.' },
                        ].map((service, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-5xl mx-auto px-6 mb-12 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-4xl font-semibold mb-6 text-center">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: 'Privacy Protection', description: 'Your conversations are secure and confidential.' },
                            { title: 'Global Connectivity', description: 'Connect with users from around the world.' },
                            { title: 'Easy to Use', description: 'Our user-friendly interface makes chatting simple and enjoyable.' },
                            { title: 'Real-Time Communication', description: 'Engage in live conversations with minimal delay.' },
                        ].map((reason, index) => (
                            <div key={index} className="bg-gray-800 border border-gray-600 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                                <p>{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-5xl mx-auto px-6 mb-12 text-center">
                    <h2 className="text-4xl font-semibold mb-6">Frequently Asked Questions</h2>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        {[
                            { question: 'Is my identity safe?', answer: 'Yes, we prioritize user anonymity and ensure that your identity is never revealed.' },
                            { question: 'Can I report inappropriate behavior?', answer: 'Absolutely! We encourage users to report any misconduct for a safer community.' },
                            { question: 'Are there any age restrictions?', answer: 'Users must be at least 13 years old to use our platform.' },
                            { question: 'How do I create an account?', answer: 'Simply sign up using your email address and start chatting!' },
                        ].map((faq, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="font-semibold">{faq.question}</h3>
                                <p>{faq.answer}</p>
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

export default Services;


