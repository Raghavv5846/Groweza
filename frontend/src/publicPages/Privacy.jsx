
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
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
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Policy</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                        <p className="text-gray-600 mb-4">
                            At Groweza, we are committed to protecting your privacy and ensuring the security of your personal information.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                        <p className="text-gray-600 mb-4">
                            We may collect personal information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4">
                            <li>Name and contact information (email address, phone number)</li>
                            <li>Business information and client details</li>
                            <li>Payment and billing information</li>
                            <li>Account credentials and preferences</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
                        <p className="text-gray-600 mb-4">
                            We automatically collect certain information when you use our service:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4">
                            <li>Device information and browser type</li>
                            <li>IP address and location data</li>
                            <li>Usage patterns and preferences</li>
                            <li>Log files and analytics data</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                        <p className="text-gray-600 mb-4">We use the collected information to:</p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4">
                            <li>Provide and maintain our service</li>
                            <li>Process transactions and manage your account</li>
                            <li>Send you technical notices and support messages</li>
                            <li>Improve our service and develop new features</li>
                            <li>Protect against fraud and unauthorized access</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
                        <p className="text-gray-600 mb-4">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4">
                            <li>With your explicit consent</li>
                            <li>To comply with legal requirements</li>
                            <li>To protect our rights and safety</li>
                            <li>With trusted service providers who assist in operating our service</li>
                            <li>In connection with a business transfer or merger</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                        <p className="text-gray-600 mb-4">
                            We implement appropriate security measures to protect your personal information against unauthorized access,
                            alteration, disclosure, or destruction. These measures include:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments and updates</li>
                            <li>Access controls and authentication measures</li>
                            <li>Employee training on data protection</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                        <p className="text-gray-600 mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4">
                            <li>Access and review your personal information</li>
                            <li>Correct inaccurate or incomplete information</li>
                            <li>Delete your personal information</li>
                            <li>Object to or restrict certain processing</li>
                            <li>Data portability</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                        <p className="text-gray-600 mb-4">
                            We use cookies and similar tracking technologies to enhance your experience and analyze usage patterns.
                            You can control cookie settings through your browser preferences.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
                        <p className="text-gray-600 mb-4">
                            Our service may contain links to third-party websites or integrate with third-party services.
                            We are not responsible for the privacy practices of these third parties.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                        <p className="text-gray-600 mb-4">
                            Our service is not intended for children under 13 years of age. We do not knowingly collect
                            personal information from children under 13.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                        <p className="text-gray-600 mb-4">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by
                            posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-gray-600 mb-4">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600">
                                Email: care@groweza.com<br />
                                Address: Plot No G1-3A SOUTH PART SUSHANT CITY-1 JAIPUR, RAJASTHAN, INDIA 302012
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Privacy;
