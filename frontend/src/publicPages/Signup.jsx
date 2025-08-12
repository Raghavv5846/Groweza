import React, { useState , useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();
    const cardRef = useRef(null);
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mousePos = useRef({ x: 0, y: 0 });


    // Particle system
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles
        const initParticles = () => {
            particles.current = [];
            for (let i = 0; i < 50; i++) {
                particles.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        };

        initParticles();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
                ctx.fill();

                // Connect nearby particles
                particles.current.forEach((otherParticle, j) => {
                    if (i !== j) {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    // 3D card effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            if (cardRef.current) {
                const card = cardRef.current;
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);

                const rotateX = -deltaY * 5;
                const rotateY = deltaX * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        };

        const handleMouseLeave = () => {
            if (cardRef.current) {
                cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

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
    // const slideVariants = {
    //     hidden: (direction) => ({
    //         x: direction > 0 ? 200 : -200,
    //         opacity: 0
    //     }),
    //     visible: {
    //         x: 0,
    //         opacity: 1,
    //         transition: {
    //             type: "spring",
    //             stiffness: 300,
    //             damping: 30
    //         }
    //     },
    //     exit: (direction) => ({
    //         x: direction > 0 ? -200 : 200,
    //         opacity: 0,
    //         transition: { duration: 0.3 }
    //     })
    // };

    const slideVariants = {
        hidden: (direction) => ({
            x: direction > 0 ? 300 : -300,
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
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        })
    };

    const successCircle = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }
    };

    const checkmarkPath = {
        hidden: { pathLength: 0 },
        visible: {
            pathLength: 1,
            transition: {
                duration: 0.5,
                delay: 0.3
            }
        }
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
    // const checkmarkPath = {
    //     hidden: { pathLength: 0, opacity: 0 },
    //     visible: {
    //         pathLength: 1,
    //         opacity: 1,
    //         transition: {
    //             duration: 0.8,
    //             ease: "easeInOut"
    //         }
    //     }
    // };

    // const successCircle = {
    //     hidden: { scale: 0 },
    //     visible: {
    //         scale: 1,
    //         transition: {
    //             duration: 0.4,
    //             ease: "easeOut"
    //         }
    //     }
    // };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center  bg-black text-white relative overflow-hidden">
            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
            />
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
                <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/10 via-transparent to-cyan-900/10" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)',
                        backgroundSize: '150% 150%',
                        animation: 'gradientFloat 20s ease-in-out infinite alternate'
                    }}
                />
            </div>

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-20 container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 cursor-pointer">

                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Groweza
                        </h1>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                     <motion.button
                            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all cursor-pointer"
                            onClick={() => navigate('/')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Back to Home
                        </motion.button>
                    </nav>
                </div>
            </header>

            {/* Main Form Card */}
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-800/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-2xl w-96 relative z-10 transition-transform duration-200"
                style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)'
                }}
            >
                {/* Shimmer effect top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-t-2xl overflow-hidden">
                    <motion.div
                        className="h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                        animate={{
                            x: [-80, 384]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {isSuccess ? (
                    <motion.div
                        className="flex flex-col items-center justify-center py-12"
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 border border-green-500/30"
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
                            className="text-2xl font-semibold mb-2 text-white"
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
                            Redirecting you to dashboard...
                        </motion.p>
                    </motion.div>
                ) : (
                    <>
                        {/* Logo and Title */}
                        <motion.div
                            className="flex items-center justify-center mb-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-3 shadow-lg">
                                <span className="text-white font-bold text-lg">G</span>
                            </div>
                            <div className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Groweza
                            </div>
                        </motion.div>

                        <motion.div
                            className="text-center mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center justify-center mb-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                    <span className="text-white text-sm">✨</span>
                                </div>
                                <span className="ml-2 text-sm text-purple-300 font-medium">AI-Powered Registration</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-2xl font-bold text-center mb-6 text-white"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Create Your Account
                        </motion.h1>

                        <motion.p
                            className="text-center text-gray-400 mb-8 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Join the intelligent freelance platform
                        </motion.p>

                        {errorMessage && (
                            <motion.div
                                className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                            </motion.div>
                        )}

                        {/* Progress Steps */}
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex flex-col items-center">
                                        <motion.div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${formStep >= step - 1
                                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-400'
                                                : 'bg-gray-700/50 border-gray-600'
                                                }`}
                                            whileHover={{ scale: 1.1 }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5 + (step * 0.1) }}
                                        >
                                            <span className="text-white font-semibold text-sm">{step}</span>
                                        </motion.div>
                                        <div className="text-xs text-gray-400 text-center">
                                            {step === 1 ? 'Profile' : step === 2 ? 'Security' : 'Review'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-2 w-full bg-gray-700/50 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((formStep + 1) / 3) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>

                        {/* Form Steps */}
                        <AnimatePresence mode="wait" custom={formStep}>
                            {formStep === 0 && (
                                <motion.div
                                    key="step1"
                                    custom={formStep}
                                    variants={slideVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-2 font-medium">Full Name</label>
                                            <motion.input
                                                whileFocus={{
                                                    scale: 1.02,
                                                    boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.5)"
                                                }}
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                className="w-full p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all"
                                            />
                                        </div>
                                        <motion.button
                                            onClick={nextStep}
                                            className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg cursor-pointer"
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Continue →
                                        </motion.button>
                                    </div>
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
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-2 font-medium">Email Address</label>
                                            <motion.input
                                                whileFocus={{
                                                    scale: 1.02,
                                                    boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.5)"
                                                }}
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                className="w-full p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-2 font-medium">Password</label>
                                            <motion.input
                                                whileFocus={{
                                                    scale: 1.02,
                                                    boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.5)"
                                                }}
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Create a strong password"
                                                className="w-full p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all"
                                            />
                                        </div>
                                        <div className="flex space-x-4">
                                            <motion.button
                                                onClick={prevStep}
                                                className="w-1/3 py-4 bg-gray-700/50 border border-gray-600/50 text-gray-300 rounded-xl font-semibold hover:bg-gray-600/50 transition-all cursor-pointer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                ← Back
                                            </motion.button>
                                            <motion.button
                                                onClick={nextStep}
                                                className="w-2/3 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg cursor-pointer"
                                                whileHover={{
                                                    scale: 1.02,
                                                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Continue →
                                            </motion.button>
                                        </div>
                                    </div>
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
                                        <h3 className="text-lg font-semibold mb-4 text-white">Review Your Information</h3>
                                        <div className="bg-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-4 space-y-3">
                                            <div className="flex justify-between items-center py-2 border-b border-gray-600/30">
                                                <span className="text-gray-400">Name</span>
                                                <span className="text-white font-medium">{formData.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-600/30">
                                                <span className="text-gray-400">Email</span>
                                                <span className="text-white font-medium">{formData.email}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-400">Password</span>
                                                <span className="text-white font-medium">••••••••</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex space-x-4">
                                            <motion.button
                                                onClick={prevStep}
                                                className="w-1/3 py-4 bg-gray-700/50 border border-gray-600/50 text-gray-300 rounded-xl font-semibold hover:bg-gray-600/50 transition-all cursor=-pointer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                ← Back
                                            </motion.button>
                                            <motion.button
                                                onClick={handleSubmit}
                                                className="w-2/3 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg flex items-center justify-center cursor-pointer"
                                                whileHover={{
                                                    scale: 1.02,
                                                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Creating Account...
                                                    </>
                                                ) : (
                                                    'Create Account ✨'
                                                )}
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Footer */}
                        <motion.div
                            className="text-center mt-8 pt-6 border-t border-gray-600/30"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <p className="text-sm text-gray-400">
                                Already have an account?{' '}
                                <a href="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                                    Sign In →
                                </a>
                            </p>
                        </motion.div>
                    </>
                )}
            </motion.div>

            {/* Background decorative elements */}
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
    );
};
export default Signup;






