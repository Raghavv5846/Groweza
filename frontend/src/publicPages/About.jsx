
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/')}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img
                                src="/lovable-uploads/2d2fdde9-90a4-471d-9f45-2bbbe316358c.png"
                                alt="Groweza Logo"
                                className="w-8 h-8 rounded-lg shadow-lg"
                            />
                            <span className="text-xl font-bold text-gray-900">Groweza</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Groweza</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Empowering freelancers worldwide with the tools they need to succeed in their business journey.
                    </p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-gray-600 mb-6">
                            At Groweza, we believe that freelancers are the backbone of the modern economy. Our mission is to provide
                            freelancers with a comprehensive platform that simplifies client management, streamlines invoicing, and
                            helps track payments - all while maintaining a beautiful and intuitive user experience.
                        </p>
                        <p className="text-gray-600">
                            We understand the challenges freelancers face in managing their business operations while focusing on
                            their craft. That's why we've built Groweza to be the all-in-one solution that grows with your business.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Client Management</h3>
                                <p className="text-gray-600">
                                    Organize all your clients in one place with detailed profiles, project tracking, and communication history.
                                </p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Invoicing</h3>
                                <p className="text-gray-600">
                                    Create stunning, customizable invoices with multiple templates and automated PDF generation.
                                </p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Tracking</h3>
                                <p className="text-gray-600">
                                    Monitor all payments, track due dates, and send automated reminders via WhatsApp.
                                </p>
                            </div>
                            <div className="bg-orange-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Task Management</h3>
                                <p className="text-gray-600">
                                    Keep track of all your project tasks and deadlines with our intuitive task management tools.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Groweza?</h2>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span><strong>Mobile-First Design:</strong> Access your business on the go with our fully responsive platform.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span><strong>Secure & Reliable:</strong> Your data is protected with enterprise-grade security.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span><strong>Easy Integration:</strong> Seamlessly integrate with WhatsApp for payment reminders.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span><strong>Professional Templates:</strong> Beautiful invoice templates that reflect your brand.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span><strong>Free to Start:</strong> Begin with our free plan and scale as your business grows.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Freelance Business?</h2>
                        <p className="text-gray-600 mb-6">
                            Join thousands of freelancers who have already streamlined their business with Groweza.
                        </p>
                        <Button
                            onClick={() => navigate('/dashboard')}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
                        >
                            Get Started Free
                        </Button>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default About;
