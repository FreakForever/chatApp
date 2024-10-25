

const Security = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <div className="flex-grow">
                <h1 className="text-5xl font-bold mb-8 text-center">Security Features</h1>
                <p className="text-lg max-w-3xl mx-auto text-center leading-relaxed mb-12">
                    Your privacy and security are our top priorities. We use end-to-end encryption to protect your
                    messages and ensure that your conversations remain private. Our platform is built with
                    industry-standard security protocols to safeguard your data.
                </p>

                <section className="max-w-5xl mx-auto px-6 mb-12 text-center">
                    <h2 className="text-4xl font-semibold mb-6">Our Security Measures</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: 'End-to-End Encryption', description: 'All messages are encrypted, ensuring that only you and the recipient can read them.' },
                            { title: 'Two-Factor Authentication', description: 'Enable 2FA for an additional layer of security on your account.' },
                            { title: 'Data Protection', description: 'We adhere to strict data protection regulations to keep your information safe.' },
                            { title: 'Regular Security Audits', description: 'Our systems undergo regular security audits to identify and address vulnerabilities.' },
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-5xl mx-auto px-6 mb-12 text-center">
                    <h2 className="text-4xl font-semibold mb-6">Why Choose Our Security?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: 'Comprehensive Protection', description: 'We employ multiple layers of security to ensure comprehensive protection of user data.' },
                            { title: 'User Control', description: 'You have control over your privacy settings and can manage your security preferences easily.' },
                            { title: 'Transparent Policies', description: 'Our privacy policies are clear, and we’re committed to keeping you informed about your data usage.' },
                            { title: '24/7 Support', description: 'Our support team is available round-the-clock to assist you with any security concerns.' },
                        ].map((reason, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
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
                            { question: 'How does end-to-end encryption work?', answer: 'End-to-end encryption ensures that your messages are encrypted on your device and can only be decrypted by the recipient.' },
                            { question: 'What should I do if I suspect a security breach?', answer: 'Immediately change your password and enable two-factor authentication. Contact our support team for assistance.' },
                            { question: 'Is my data sold to third parties?', answer: 'No, we do not sell user data to third parties. Your privacy is our priority.' },
                            { question: 'How can I report suspicious activity?', answer: 'You can report suspicious activity through our platform, and our team will investigate promptly.' },
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

export default Security;






