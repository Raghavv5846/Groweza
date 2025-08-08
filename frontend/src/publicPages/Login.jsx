import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { googleAuth } from "../api.js";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';

const EnhancedLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [loginMode, setLoginMode] = useState('default'); // 'default', 'loading', 'success', 'error'
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Invalid email or password. Please try again.');




    const navigate = useNavigate();

    // Function to show success toast and transition to success state
    const showSuccessAndTransition = () => {
        setLoginMode('success');
        toast.success("Login successful! Redirecting to dashboard...");
    };

    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                setIsLoading(true);
                setLoginMode('loading');
                const loadingToastId = toast.info("Processing Google sign-in...", { autoClose: false });

                const result = await googleAuth(authResult["code"]);

                toast.dismiss(loadingToastId);

                if (result?.data?.token) {
                    handleSuccessfulLogin(result.data);
                } else {
                    throw new Error("Invalid response from server");
                }
            }
        } catch (error) {
            handleLoginError(error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleGoogleError = (error) => {
        console.error("Google Login Failed:", error);
        setLoginMode("error");
        setErrorMessage("Google login failed. Please try again.");
        toast.error("Google login failed. Please try again.");
    };

    // Updated Google Login handler
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: handleGoogleError,
        flow: "auth-code",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSuccessfulLogin = (data) => {
        if (data.token) {
            localStorage.setItem("authToken", data.token);
            try {
                const decodedUser = jwtDecode(data.token);
                localStorage.setItem("user", JSON.stringify(decodedUser));
                showSuccessAndTransition();
            } catch (error) {
                console.error("Error decoding token:", error);
                toast.warning("Login successful but couldn't process user data");
                showSuccessAndTransition();
            }
        }

        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    const handleLoginError = (error) => {
        setLoginMode('error');

        let message = 'Something went wrong. Please try again later.';
        if (error.response?.data?.message) {
            message = error.response.data.message;
        }

        setErrorMessage(message);
        toast.error(message);
        setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginMode('loading');


        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/login`,
                credentials,
                { headers: { 'Content-Type': 'application/json' } }
            );
            handleSuccessfulLogin(response.data);


        } catch (error) {
            handleLoginError(error);
        }
    };





    // Background particle effect
    const Particles = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(25)].map((_, i) => (
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
                        x: [null, Math.random() * window.innerWidth + 100],
                        transition: {
                            duration: Math.random() * 30 + 15,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear",
                        },
                    }}
                    style={{
                        width: `${Math.random() * 40 + 5}px`,
                        height: `${Math.random() * 40 + 5}px`,
                        opacity: Math.random() * 0.4 + 0.1,
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

    // Input field animation
    const inputVariants = {
        focus: {
            scale: 1.02,
            borderColor: "#3683fc",
            boxShadow: "0 0 15px rgba(54, 131, 252, 0.3)",
            transition: { type: "spring", stiffness: 400, damping: 17 }
        },
        blur: {
            scale: 1,
            borderColor: "#4a55824d",
            boxShadow: "none",
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="flex w-full  flex-col items-center  min-h-screen  bg-gradient-to-br from-blue-50 via-white to-purple-50  relative overflow-hidden">

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

            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0 opacity-20 pointer-events-none bg-white"
                initial={{ backgroundPosition: '0% 0%' }}
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                    transition: { duration: 20, repeat: Infinity, repeatType: 'reverse' }
                }}
                style={{
                    backgroundImage: 'radial-gradient(circle at center, rgba(108, 93, 211, 0.3) 0%, rgba(54, 131, 252, 0.2) 50%, rgba(20, 30, 60, 0) 80%)',
                    backgroundSize: '150% 150%',
                }}
            />


            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, type: "spring" }}
                className="bg-gray-100-100 rounded-2xl w-100 backdrop-blur-lg shadow-2xl border border-[#4a558280] relative z-10 overflow-hidden"
            >
                {/* Top colored accent */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6c5dd3] via-[#3683fc] to-[#5f95ff]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                />

                <div className="p-8">
                    <motion.div
                        className="flex items-center mb-8"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="w-10 h-10 rounded-lg mr-3 flex items-center justify-center bg-gradient-to-br from-purple-300 to-blue-300"
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                            >
                               <img src="/logo.png" alt="logo" className='w-10 h-10 rounded-2xl' />
                            </motion.div>
                        </motion.div>
                        <div>
                            <motion.div
                                className="text-2xl font-bold tracking-wide gradient-logo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                <h1>Groweza</h1>
                            </motion.div>
                            <motion.div
                                className="text-xs text-[#a0aec0]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                            </motion.div>
                        </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {loginMode === 'success' ? (
                            <motion.div
                                className="flex flex-col items-center justify-center py-10"
                                initial="hidden"
                                animate="visible"
                                key="success"
                            >
                                <motion.div
                                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
                                    className="text-2xl font-semibold mb-2 text-gray-600"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Welcome Back!
                                </motion.h2>
                                <motion.p
                                    className="text-center   text-gray-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    Taking you to your dashboard...
                                </motion.p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="login-form"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    <motion.h1
                                        className="text-2xl font-bold  mb-2 text-gray-700"
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Welcome back
                                    </motion.h1>
                                    <motion.p
                                        className="text-gray-500 text-sm mb-8"
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Enter your credentials to access your account
                                    </motion.p>
                                </motion.div>

                                {loginMode === 'error' && (
                                    <motion.div
                                        className="mb-6 bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-200"
                                        initial={{ opacity: 0, y: -10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                        <div className="flex items-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                                                <path d="M12 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <circle cx="12" cy="16" r="1" fill="currentColor" />
                                            </svg>
                                            {errorMessage}
                                        </div>
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <motion.div
                                        className="mb-5"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                    >
                                            <label htmlFor="email" className="block text-sm font-medium  text-gray-600 mb-2">Email</label>
                                        <motion.div
                                            variants={inputVariants}
                                            initial="blur"
                                            whileFocus="focus"
                                            whileHover={{ scale: 1.01 }}
                                            className="relative"
                                        >
                                            <div className="absolute left-3 top-3.5 text-gray-700">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor" />
                                                </svg>
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={credentials.email}
                                                onChange={handleChange}
                                                placeholder="name@company.com"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-[#4a55824d] rounded-lg text-black text-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-[#3683fc33] transition"

                                            />
                                        </motion.div>
                                    </motion.div>

                                    <motion.div
                                        className="mb-5"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                                <label htmlFor="password" className="block text-sm font-medium  text-gray-600">Password</label>
                                        </div>
                                        <motion.div
                                            variants={inputVariants}
                                            initial="blur"
                                            whileFocus="focus"
                                            whileHover={{ scale: 1.01 }}
                                            className="relative"
                                        >
                                            <div className="absolute left-3 top-3.5 text-gray-700">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" fill="currentColor" />
                                                </svg>
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                value={credentials.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                required
                                                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-[#4a55824d] rounded-lg text-black text-sm focus:outline-none focus:border-purple-700 focus:ring-4 focus:ring-[#3683fc33] transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-3 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                                            >
                                                {showPassword ? (
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 6C15.79 6 19.17 8.13 20.82 11.5C20.23 12.72 19.4 13.77 18.41 14.62L19.82 16.03C21.21 14.8 22.31 13.26 23 11.5C21.27 7.11 16.89 4 12 4C10.73 4 9.51 4.2 8.36 4.57L10.01 6.22C10.66 6.09 11.32 6 12 6Z" fill="currentColor" />
                                                        <path d="M12 8C13.66 8 15 9.34 15 11C15 11.7 14.74 12.34 14.31 12.83L15.72 14.24C16.5 13.34 17 12.23 17 11C17 8.24 14.76 6 12 6C10.77 6 9.66 6.5 8.76 7.27L10.17 8.68C10.66 8.26 11.3 8 12 8Z" fill="currentColor" />
                                                        <path d="M3.71 2.29C3.32 2.68 3.32 3.31 3.71 3.7L5.74 5.73C3.68 7.38 2.04 9.78 1 12.5C2.73 16.89 7.11 20 12 20C14.05 20 16.01 19.45 17.69 18.47L20.29 21.07C20.68 21.46 21.31 21.46 21.7 21.07C22.09 20.68 22.09 20.05 21.7 19.66L4.34 2.29C3.95 1.9 3.32 1.9 2.93 2.29L3.71 2.29ZM12 18C8.21 18 4.83 15.87 3.18 12.5C4.17 10.36 5.9 8.66 8 7.68L9.6 9.28C9.22 9.79 9 10.38 9 11C9 12.66 10.34 14 12 14C12.62 14 13.21 13.78 13.72 13.4L15.02 14.7C14.12 15.5 13.11 16 12 16V18ZM11.82 12.82C11.16 12.42 10.7 11.55 11.18 10.7C11.32 10.42 12.08 11.18 11.82 12.82Z" fill="currentColor" />
                                                    </svg>
                                                ) : (
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 4C7.11 4 2.73 7.11 1 11.5C2.73 15.89 7.11 19 12 19C16.89 19 21.27 15.89 23 11.5C21.27 7.11 16.89 4 12 4ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 8.74 9.24 6.5 12 6.5C14.76 6.5 17 8.74 17 11.5C17 14.26 14.76 16.5 12 16.5ZM12 8.5C10.34 8.5 9 9.84 9 11.5C9 13.16 10.34 14.5 12 14.5C13.66 14.5 15 13.16 15 11.5C15 9.84 13.66 8.5 12 8.5Z" fill="currentColor" />
                                                    </svg>
                                                )}
                                            </button>
                                        </motion.div>
                                    </motion.div>

                                    <motion.button
                                        type="submit"
                                        className="w-full py-3 bg-gradient-to-r from-purple-700 to-blue-500 text-white rounded-lg text-sm font-semibold hover:from-[#2d6cda] hover:to-[#4a7ee6] hover:-translate-y-0.5 transition mt-2 flex items-center justify-center cursor-pointer"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.7, duration: 0.5 }}
                                        whileHover={{
                                            scale: 1.03,
                                            boxShadow: "0 10px 25px -5px rgba(54, 131, 252, 0.5)",
                                            y: -2,
                                            transition: { type: "spring", stiffness: 400, damping: 10 }
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        disabled={isLoading}
                                        onClick={() => {
                                            if (loginMode === 'loading') {
                                                // Just to prevent double submissions
                                                return;
                                            }
                                        }}
                                    >
                                        {loginMode === 'loading' ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Signing In...
                                            </>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </motion.button>
                                </form>

                                <motion.div
                                    className="flex items-center my-6 text-gray-700 text-xs"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                >
                                    <div className="flex-1 border-t border-gray-900 mr-3"></div>
                                    or continue with
                                    <div className="flex-1 border-t border-gray-900 ml-3"></div>
                                </motion.div>

                                <motion.div
                                    className="w-full flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    <motion.button
                                        onClick={() => {
                                            setIsLoading(true);
                                            handleGoogleLogin();
                                        }}
                                        className="bg-gray-200 border border-gradient-logo rounded-lg p-2.5 flex items-center justify-center 
                                hover:bg-gray-400 hover:-translate-y-1 transition-all duration-300 w-full cursor-pointer"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8, type: "spring", stiffness: 400, damping: 15 }}
                                        
                                        aria-label="Sign in with Google"
                                    >
                                        <img src="/Google-.png" alt="Google" width="35" height="35" />
                                    </motion.button>
                                </motion.div>

                                <motion.div
                                    className="text-center mt-8 text-sm text-gray-600"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1, duration: 0.5 }}
                                >
                                    Don't have an account? {' '}
                                    <motion.a
                                        href="#"
                                        className="text-purple-500 font-medium hover:underline inline-flex items-center"
                                        whileHover={{ scale: 1.05, color: "#5f95ff" }}
                                    >
                                        <a href='/signup'> Sign up </a>
                                        <svg className="ml-1 w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.a>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

        </div>

    );
};

export default EnhancedLogin;