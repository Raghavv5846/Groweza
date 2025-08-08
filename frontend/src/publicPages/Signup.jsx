import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: "student"
    });
    const [formStep, setFormStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const nextStep = (e) => {
        e.preventDefault();
        setFormStep(formStep + 1);
    };

    const prevStep = (e) => {
        e.preventDefault();
        setFormStep(formStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/signup`, formData);
            setIsLoading(false);
            setIsSuccess(true);
            toast.success('Account created successfully!');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            setErrorMessage('Error signing up. Please try again.');
            toast.error(error.response?.data?.message || 'Error signing up. Please try again.');
        }
    };


    // Form step animations
    const slideVariants = {
        hidden: (direction) => ({
            x: direction > 0 ? 200 : -200,
            opacity: 0
        }),
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        exit: (direction) => ({
            x: direction > 0 ? -200 : 200,
            opacity: 0,
            transition: { duration: 0.3 }
        })
    };

    // Background particle effect
    const Particles = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-blue-500/10"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: [null, Math.random() * window.innerHeight],
                        transition: {
                            duration: Math.random() * 20 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear",
                        },
                    }}
                    style={{
                        width: `${Math.random() * 30 + 10}px`,
                        height: `${Math.random() * 30 + 10}px`,
                        opacity: Math.random() * 0.5 + 0.1,
                    }}
                />
            ))}
        </div>
    );

    // Success animation
    const checkmarkPath = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    };

    const successCircle = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center  bg-[#0c1122] bg-gradient-to-br from-blue-50 via-white to-purple-50 text-white relative overflow-hidden">
                        <header className="container mx-auto mb-10 px-10 border-b-2 py-5 bg-gray-50">
                            <div className="flex items-center justify-between" onClick={()=>{navigate("/")}}>
                                <div className="flex items-center space-x-3 cursor-pointer">
                                    <img
                                        src="/logo.png"
                                        alt="Groweza Logo"
                                        className="w-10 h-10 rounded-lg shadow-lg"
                                    />
                                    <h1 className="text-2xl font-bold gradient-logo cursor-pointer">Groweza</h1>
                                </div>
                                <nav className="hidden md:flex items-center space-x-8">
                                    <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                                    <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
                                    <a href="#free-platform" className="text-gray-600 hover:text-gray-900 transition-colors">Free Platform</a>
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate('/login')}
                                        className="text-gray-600 hover:text-gray-900 cursor-pointer "
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/login')}
                                        className="btn-gradient-primary text-white cursor-pointer"
                                    >
                                        Get Started Free
                                    </Button>
                                </nav>
                            </div>
                        </header>

            <Particles />

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-50 border border-gray-500 rounded-2xl p-10 shadow-xl backdrop-blur-md w-96 relative z-10"

            >
                {isSuccess ? (
                    <motion.div
                        className="flex flex-col items-center justify-center py-10"
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                            variants={successCircle}
                        >
                            <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
                                <motion.path
                                    d="M14 27L21 34L36 16"
                                    stroke="#4ade80"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    variants={checkmarkPath}
                                />
                            </svg>
                        </motion.div>
                        <motion.h2
                            className="text-2xl font-semibold mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Account Created!
                        </motion.h2>
                        <motion.p
                            className="text-center text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Redirecting you to login...
                        </motion.p>
                    </motion.div>
                ) : (
                    <>
                        <motion.div className="flex items-center mb-8"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-12 h-12 rounded-lg mr-3"><img src="/logo.png" className='h-12 w-12 rounded-xl' alt="" /></div>
                            <div className="text-xl font-semibold tracking-wide gradient-logo">Groweza</div>
                        </motion.div>

                        <motion.h1
                            className="text-2xl font-semibold text-center mb-6 text-gray-400"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Create an Account
                        </motion.h1>

                        {errorMessage && (
                            <motion.p className="text-red-500 text-center mb-4">
                                {errorMessage}
                            </motion.p>
                        )}

                        <motion.div
                            className="mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex justify-between items-center">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex flex-col items-center">
                                        <motion.div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${formStep >= step - 1 ? 'bg-blue-500' : 'bg-[#0f172a99] border border-[#4a55824d]'}`}
                                            whileHover={{ scale: 1.1 }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.3 + (step * 0.1) }}
                                        >
                                            {step}
                                        </motion.div>
                                        <div className="text-xs text-gray-700">
                                            {step === 1 ? 'Profile' : step === 2 ? 'Security' : 'Review'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-1 w-full bg-gray-200 mt-2 rounded-full overflow-hidden">

                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(formStep + 1) / 3 * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>

                        <AnimatePresence custom={formStep}>
                            {formStep === 0 && (
                                <motion.div
                                    key="step1"
                                    custom={formStep}
                                    variants={slideVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <form onSubmit={nextStep} className="space-y-6">
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-2">Name</label>
                                            <motion.input
                                                whileTap={{ scale: 0.98 }}
                                                whileFocus={{ borderColor: "#3683fc", boxShadow: "0 0 0 2px rgba(54, 131, 252, 0.2)" }}
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-200 border border-[#4a55824d] rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                                            />
                                        </div>
                                        <motion.button
                                            type="submit"
                                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-[#2d6cda] transition cursor-pointer"
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => {
                                                if (!formData.name.trim()) {
                                                    toast.warning('Please enter your name');
                                                    return;
                                                }
                                            }}
                                        >
                                            Next Step
                                        </motion.button>
                                    </form>
                                </motion.div>
                            )}

                            {formStep === 1 && (
                                <motion.div
                                    key="step2"
                                    custom={formStep}
                                    variants={slideVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <form onSubmit={nextStep} className="space-y-6">
                                        <div>
                                            <label className="block text-sm text-gray-700 mb-2">Email</label>
                                            <motion.input
                                                whileTap={{ scale: 0.98 }}
                                                whileFocus={{ borderColor: "#3683fc", boxShadow: "0 0 0 2px rgba(54, 131, 252, 0.2)" }}
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-100 border border-[#4a55824d] rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#3683fc]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-700 mb-2">Password</label>
                                            <motion.input
                                                whileTap={{ scale: 0.98 }}
                                                whileFocus={{ borderColor: "#3683fc", boxShadow: "0 0 0 2px rgba(54, 131, 252, 0.2)" }}
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-100 border border-[#4a55824d] rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#3683fc]"
                                            />
                                        </div>
                                        <div className="flex space-x-3">
                                            <motion.button
                                                onClick={prevStep}
                                                className="w-1/3 py-3 bg-gray-100 border border-[#4a55824d] text-gray-400 rounded-lg text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                Back
                                            </motion.button>
                                            <motion.button
                                                type="submit"
                                                    className="w-2/3 py-3  bg-gradient-to-r from-purple-500 to-blue-500 cursor-pointer text-white rounded-lg text-sm font-semibold hover:bg-[#2d6cda] transition"
                                                whileHover={{ scale: 1.03, y: -2 }}
                                                onClick={() => {
                                                    if (!formData.email.trim()) {
                                                        toast.warning('Please enter your email');
                                                        return;
                                                    }
                                                    if (!formData.password.trim()) {
                                                        toast.warning('Please enter your password');
                                                        return;
                                                    }
                                                    if (formData.password.length < 6) {
                                                        toast.warning('Password must be at least 6 characters');
                                                        return;
                                                    }
                                                }}
                                            >
                                                Next Step
                                            </motion.button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {formStep === 2 && (
                                <motion.div
                                    key="step3"
                                    custom={formStep}
                                    variants={slideVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium mb-4 text-gray-600">Review Your Information</h3>
                                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                            <div className="flex justify-between py-4 border-b border-[#4a55824d]">
                                                <span className="text-gray-600">Name</span>
                                                <span className='text-gray-700'>{formData.name}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-[#4a55824d]">
                                                <span className="text-gray-600">Email</span>
                                                    <span className='text-gray-700'>{formData.email}</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Password</span>
                                                    <span className='text-gray-700'>{formData.password}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* <div className="flex items-center mb-4">
                      <input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 mr-2"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-300">
                        I agree to the <a href="#" className="text-[#3683fc]">Terms of Service</a> and <a href="#" className="text-[#3683fc]">Privacy Policy</a>
                      </label>
                    </div> */}
                                        <div className="flex space-x-3">
                                            <motion.button
                                                onClick={prevStep}
                                                className="w-1/3 py-3 bg-gray-100 border border-[#4a55824d] text-gray-400 cursor-pointer rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                Back
                                            </motion.button>
                                            <motion.button
                                                type="submit"
                                                    className="w-2/3 py-3 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-[#2d6cda] transition flex items-center justify-center"
                                                whileHover={{ scale: 1.03, y: -2 }}
                                                whileTap={{ scale: 0.97 }}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : null}
                                                {isLoading ? "Creating Account..." : "Create Account"}
                                            </motion.button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.p
                            className="text-center text-sm text-gray-400 mt-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            Already have an account? <a href="/login" className="text-[#3683fc] hover:underline">Login</a>
                        </motion.p>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default Signup;