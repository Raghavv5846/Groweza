
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Disclaimer</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">General Information</h2>
                        <p className="text-gray-600 mb-4">
                            The information contained on Groweza ("Service") is for general information purposes only.
                            While we endeavor to keep the information up to date and correct, we make no representations
                            or warranties of any kind, express or implied, about the completeness, accuracy, reliability,
                            suitability, or availability with respect to the Service or the information contained on the
                            Service for any purpose.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Use at Your Own Risk</h2>
                        <p className="text-gray-600 mb-4">
                            Any reliance you place on such information is therefore strictly at your own risk. In no event
                            will we be liable for any loss or damage including without limitation, indirect or consequential
                            loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising
                            out of, or in connection with, the use of this Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
                        <p className="text-gray-600 mb-4">
                            Through this Service, you are able to link to other websites which are not under the control of Groweza.
                            We have no control over the nature, content, and availability of those sites. The inclusion of any
                            links does not necessarily imply a recommendation or endorse the views expressed within them.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Every effort is made to keep the Service up and running smoothly. However, Groweza takes no
                            responsibility for, and will not be liable for, the Service being temporarily unavailable due
                            to technical issues beyond our control.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial and Legal Advice</h2>
                        <p className="text-gray-600 mb-4">
                            Groweza is a business management tool and does not provide financial, legal, or tax advice.
                            The information provided through our Service should not be considered as professional advice.
                            We recommend consulting with qualified professionals for specific financial, legal, or tax matters.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Accuracy</h2>
                        <p className="text-gray-600 mb-4">
                            While we strive to ensure the accuracy of calculations and features within our Service,
                            users are responsible for verifying the accuracy of their data, invoices, and financial records.
                            Groweza is not liable for any errors in calculations or data entry.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Integrations</h2>
                        <p className="text-gray-600 mb-4">
                            Our Service may integrate with third-party services such as WhatsApp for messaging features.
                            We are not responsible for the availability, functionality, or policies of these third-party services.
                            Users should review the terms and privacy policies of any third-party services they choose to use.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                        <p className="text-gray-600 mb-4">
                            In no event shall Groweza, its directors, employees, partners, agents, suppliers, or affiliates
                            be liable for any indirect, incidental, punitive, consequential, or similar damages whatsoever
                            (including, but not limited to, loss of data, revenue, profits, use or other economic advantage)
                            arising out of or in connection with the Service, even if we have been previously advised of the
                            possibility of such damages.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
                        <p className="text-gray-600 mb-4">Users of Groweza are responsible for:</p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4">
                            <li>Ensuring the accuracy of their data and information</li>
                            <li>Complying with applicable laws and regulations</li>
                            <li>Maintaining the security of their account credentials</li>
                            <li>Using the Service in accordance with our Terms of Service</li>
                            <li>Backing up their important data regularly</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Disclaimer</h2>
                        <p className="text-gray-600 mb-4">
                            Groweza reserves the right to modify this disclaimer at any time. Changes will be effective
                            immediately upon posting. Your continued use of the Service after any changes constitutes
                            acceptance of the modified disclaimer.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                        <p className="text-gray-600 mb-4">
                            This disclaimer is governed by and construed in accordance with the laws of the United States,
                            and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                        <p className="text-gray-600 mb-4">
                            If you have any questions about this disclaimer, please contact us at:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600">
                                Email: care@groweza.com<br />
                                Address: Plot No G1-3A SOUTH PART,SUSHANT CITY-1 JAIPUR, INDIA 302012              </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Disclaimer;
