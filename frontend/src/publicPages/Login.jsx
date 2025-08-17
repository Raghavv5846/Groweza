// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import { googleAuth } from "../api.js";
// import { useNavigate } from "react-router-dom";
// import { useGoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//     Eye,
//     EyeOff,
//     Mail,
//     Lock,
//     ArrowRight,
//     Check,
//     Sparkles,
//     Brain,
//     Zap,
//     Shield,
//     ChevronRight
// } from 'lucide-react';

// const EnhancedLogin = () => {
//     const [credentials, setCredentials] = useState({ email: '', password: '' });
//     const [isLoading, setIsLoading] = useState(false);
//     const [loginMode, setLoginMode] = useState('default'); // 'default', 'loading', 'success', 'error'
//     const [showPassword, setShowPassword] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('Invalid email or password. Please try again.');
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//     const canvasRef = useRef(null);
//     const navigate = useNavigate();

//     // Function to show success toast and transition to success state
//     const showSuccessAndTransition = () => {
//         setLoginMode('success');
//         toast.success("Login successful! Redirecting to dashboard...");
//     };

//     const responseGoogle = async (authResult) => {
//         try {
//             if (authResult["code"]) {
//                 setIsLoading(true);
//                 setLoginMode('loading');
//                 const loadingToastId = toast.info("Processing Google sign-in...", { autoClose: false });

//                 const result = await googleAuth(authResult["code"]);

//                 toast.dismiss(loadingToastId);

//                 if (result?.data?.token) {
//                     handleSuccessfulLogin(result.data);
//                 } else {
//                     throw new Error("Invalid response from server");
//                 }
//             }
//         } catch (error) {
//             handleLoginError(error);
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     const handleGoogleError = (error) => {
//         console.error("Google Login Failed:", error);
//         setLoginMode("error");
//         setErrorMessage("Google login failed. Please try again.");
//         toast.error("Google login failed. Please try again.");
//     };

//     // Updated Google Login handler
//     const handleGoogleLogin = useGoogleLogin({
//         onSuccess: responseGoogle,
//         onError: handleGoogleError,
//         flow: "auth-code",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCredentials({ ...credentials, [name]: value });
//     };

//     const handleSuccessfulLogin = (data) => {
//         if (data.token) {
//             localStorage.setItem("authToken", data.token);
//             try {
//                 const decodedUser = jwtDecode(data.token);
//                 localStorage.setItem("user", JSON.stringify(decodedUser));
//                 showSuccessAndTransition();
//             } catch (error) {
//                 console.error("Error decoding token:", error);
//                 toast.warning("Login successful but couldn't process user data");
//                 showSuccessAndTransition();
//             }
//         }

//         setTimeout(() => {
//             navigate('/dashboard');
//         }, 1500);
//     };

//     const handleLoginError = (error) => {
//         setLoginMode('error');

//         let message = 'Something went wrong. Please try again later.';
//         if (error.response?.data?.message) {
//             message = error.response.data.message;
//         }

//         setErrorMessage(message);
//         toast.error(message);
//         setIsLoading(false);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setLoginMode('loading');


//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/login`,
//                 credentials,
//                 { headers: { 'Content-Type': 'application/json' } }
//             );
//             handleSuccessfulLogin(response.data);


//         } catch (error) {
//             handleLoginError(error);
//         }
//     };





//     // Background particle effect
//     const Particles = () => (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//             {[...Array(25)].map((_, i) => (
//                 <motion.div
//                     key={i}
//                     className="absolute rounded-full bg-blue-500/10"
//                     initial={{
//                         x: Math.random() * window.innerWidth,
//                         y: Math.random() * window.innerHeight,
//                         scale: Math.random() * 0.5 + 0.5,
//                     }}
//                     animate={{
//                         y: [null, Math.random() * window.innerHeight],
//                         x: [null, Math.random() * window.innerWidth + 100],
//                         transition: {
//                             duration: Math.random() * 30 + 15,
//                             repeat: Infinity,
//                             repeatType: "reverse",
//                             ease: "linear",
//                         },
//                     }}
//                     style={{
//                         width: `${Math.random() * 40 + 5}px`,
//                         height: `${Math.random() * 40 + 5}px`,
//                         opacity: Math.random() * 0.4 + 0.1,
//                     }}
//                 />
//             ))}
//         </div>
//     );

//     // Success animation
//     const checkmarkPath = {
//         hidden: { pathLength: 0, opacity: 0 },
//         visible: {
//             pathLength: 1,
//             opacity: 1,
//             transition: {
//                 duration: 0.8,
//                 ease: "easeInOut"
//             }
//         }
//     };

//     // Input field animation
//     const inputVariants = {
//         focus: {
//             scale: 1.02,
//             borderColor: "#3683fc",
//             boxShadow: "0 0 15px rgba(54, 131, 252, 0.3)",
//             transition: { type: "spring", stiffness: 400, damping: 17 }
//         },
//         blur: {
//             scale: 1,
//             borderColor: "#4a55824d",
//             boxShadow: "none",
//             transition: { duration: 0.2 }
//         }
//     };

//     // 3D transform based on mouse position
//     const getTransform = (intensity = 1) => {
//         const x = (mousePosition.x - window.innerWidth / 2) / 50 * intensity;
//         const y = (mousePosition.y - window.innerHeight / 2) / 50 * intensity;
//         return `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
//     };

//     // Mouse tracking for 3D effects
//     useEffect(() => {
//         const handleMouseMove = (e) => {
//             setMousePosition({ x: e.clientX, y: e.clientY });
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         return () => window.removeEventListener('mousemove', handleMouseMove);
//     }, []);

//     // Particle system
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         const particles = [];
//         const particleCount = 30;

//         class Particle {
//             constructor() {
//                 this.x = Math.random() * canvas.width;
//                 this.y = Math.random() * canvas.height;
//                 this.vx = (Math.random() - 0.5) * 0.3;
//                 this.vy = (Math.random() - 0.5) * 0.3;
//                 this.size = Math.random() * 2 + 1;
//                 this.opacity = Math.random() * 0.5 + 0.2;
//             }

//             update() {
//                 this.x += this.vx;
//                 this.y += this.vy;

//                 if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
//                 if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
//             }

//             draw() {
//                 ctx.beginPath();
//                 ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//                 ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
//                 ctx.fill();
//             }
//         }

//         for (let i = 0; i < particleCount; i++) {
//             particles.push(new Particle());
//         }

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             particles.forEach(particle => {
//                 particle.update();
//                 particle.draw();
//             });

//             requestAnimationFrame(animate);
//         };

//         animate();

//         const handleResize = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);



//     return (
//         <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
//             {/* Particle Canvas Background */}
//             <canvas
//                 ref={canvasRef}
//                 className="fixed inset-0 pointer-events-none z-0"
//                 style={{ mixBlendMode: 'screen' }}
//             />

//             {/* Gradient Overlays */}
//             <div className="fixed inset-0 pointer-events-none z-0">
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
//                 <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/10 via-transparent to-cyan-900/10" />
//                 <div
//                     className="absolute inset-0 opacity-30"
//                     style={{
//                         background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)',
//                         backgroundSize: '150% 150%',
//                         animation: 'gradientFloat 20s ease-in-out infinite alternate'
//                     }}
//                 />
//             </div>

//             {/* Navigation Header */}
//             <header className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 mb-10">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-16">
//                         <div className="flex items-center space-x-3 cursor-pointer">
//                             <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
//                             onClick={() => navigate("/")}>
//                                 Groweza
//                             </h1>
//                         </div>

//                         <nav className="hidden md:flex items-center space-x-8">
//                             <button className="px-6 py-2 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 rounded-lg transition-all duration-300 cursor-pointer"
//                             onClick={() => navigate("/")}>
//                                 Back to Home
//                             </button>
//                         </nav>
//                     </div>
//                 </div>
//             </header>

//             {/* Main Login Container */}
//             <div className="relative z-10 w-full max-w-md mx-4 mt-30">
//                 <div
//                     className="relative group"
//                     style={{ transform: getTransform(0.3) }}
//                 >
//                     {/* Glowing background */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-3xl scale-110 group-hover:scale-125 transition-transform duration-700" />

//                     {/* Main card */}
//                     <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
//                         {/* Top accent bar */}
//                         <div
//                             className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
//                             style={{ animation: 'shimmer 3s ease-in-out infinite' }}
//                         />

//                         <div className="p-8">
//                             {/* Logo and title */}
//                             <div className="flex items-center mb-8">
//                                 <div>
//                                     <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                                         Groweza
//                                     </h2>
//                                     <p className="text-xs text-gray-400">AI-Powered Freelancer Dashboard</p>
//                                 </div>
//                             </div>

//                             {/* Success State */}
//                             {loginMode === 'success' ? (
//                                 <div className="flex flex-col items-center justify-center py-10">
//                                     <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 relative">
//                                         <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
//                                         <Check className="text-green-400" size={40} />
//                                     </div>
//                                     <h3 className="text-2xl font-bold text-white mb-2">Welcome Back!</h3>
//                                     <p className="text-gray-400 text-center">
//                                         Initializing your AI dashboard...
//                                     </p>
//                                     <div className="flex items-center space-x-2 mt-4">
//                                         <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
//                                         <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
//                                         <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <>
//                                     {/* Header */}
//                                     <div className="mb-8">
//                                         <div className="flex items-center mb-4">
//                                             <Sparkles className="text-yellow-400 mr-2" size={20} />
//                                             <span className="text-sm font-medium text-purple-300">AI-Powered Login</span>
//                                         </div>
//                                         <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
//                                         <p className="text-gray-400">
//                                             Access your intelligent freelance dashboard
//                                         </p>
//                                     </div>

//                                     {/* Error Message */}
//                                     {loginMode === 'error' && (
//                                         <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 backdrop-blur-sm">
//                                             <div className="flex items-center text-red-400">
//                                                 <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mr-3 flex-shrink-0">
//                                                     <div className="w-2 h-2 bg-red-400 rounded-full" />
//                                                 </div>
//                                                 <span className="text-sm">{errorMessage}</span>
//                                             </div>
//                                         </div>
//                                     )}

//                                     {/* Login Form */}
//                                     <div className="space-y-6">
//                                         {/* Email Field */}
//                                         <div className="space-y-2">
//                                             <label htmlFor="email" className="block text-sm font-medium text-gray-300">
//                                                 Email Address
//                                             </label>
//                                             <div className="relative group">
//                                                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                                                 <div className="relative">
//                                                     <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={18} />
//                                                     <input
//                                                         type="email"
//                                                         id="email"
//                                                         name="email"
//                                                         value={credentials.email}
//                                                         onChange={handleChange}
//                                                         placeholder="demo@groweza.com"
//                                                         required
//                                                         className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Password Field */}
//                                         <div className="space-y-2">
//                                             <label htmlFor="password" className="block text-sm font-medium text-gray-300">
//                                                 Password
//                                             </label>
//                                             <div className="relative group">
//                                                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                                                 <div className="relative">
//                                                     <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={18} />
//                                                     <input
//                                                         type={showPassword ? "text" : "password"}
//                                                         id="password"
//                                                         name="password"
//                                                         value={credentials.password}
//                                                         onChange={handleChange}
//                                                         placeholder="demo123"
//                                                         required
//                                                         className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
//                                                     />
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => setShowPassword(!showPassword)}
//                                                         className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-10 cursor-pointer"
//                                                     >
//                                                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Sign In Button */}
//                                         <button
//                                             onClick={handleSubmit}
//                                             disabled={isLoading}
//                                             className="w-full relative group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 cursor-pointer"
//                                         >
//                                             <span className="relative z-10 flex items-center justify-center">
//                                                 {loginMode === 'loading' ? (
//                                                     <>
//                                                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
//                                                         Authenticating...
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         Sign In to Dashboard
//                                                         <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
//                                                     </>
//                                                 )}
//                                             </span>
//                                             <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                                             <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
//                                         </button>
//                                     </div>

//                                     {/* Divider */}
//                                     <div className="flex items-center my-8">
//                                         <div className="flex-1 border-t border-white/10" />
//                                         <span className="px-4 text-xs text-gray-400">or continue with</span>
//                                         <div className="flex-1 border-t border-white/10" />
//                                     </div>

//                                     {/* Google Sign In */}
//                                     <button
//                                         onClick={handleGoogleLogin}
//                                         disabled={isLoading}
//                                         className="w-full group relative bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
//                                     >
//                                         <div className="flex items-center space-x-3">
//                                             <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
//                                                 <svg width="18" height="18" viewBox="0 0 24 24">
//                                                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                                                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                                                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                                                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                                                 </svg>
//                                             </div>
//                                             <span className="text-white font-medium">Continue with Google</span>
//                                         </div>
//                                     </button>

//                                     {/* Sign Up Link */}
//                                     <div className="text-center mt-8">
//                                         <p className="text-gray-400">
//                                             Don't have an account?{' '}
//                                             <a
//                                                 href="/signup"
//                                                 className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center group transition-colors"
//                                             >
//                                                 Sign up for free
//                                                 <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//                                             </a>
//                                         </p>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Trust Indicators */}
//                 <div className="mt-8 flex items-center justify-center space-x-6 text-xs text-gray-500">
//                     <div className="flex items-center space-x-1">
//                         <Shield size={12} />
//                         <span>256-bit SSL</span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                         <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                         <span>99.9% Uptime</span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                         <Brain size={12} />
//                         <span>AI-Secured</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Custom Styles */}
//             <style jsx>{`
//         @keyframes gradientFloat {
//           0%, 100% { 
//             transform: translateY(0px) scale(1);
//             opacity: 0.3;
//           }
//           50% { 
//             transform: translateY(-20px) scale(1.05);
//             opacity: 0.5;
//           }
//         }

//         @keyframes shimmer {
//           0% { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }

//         /* Enhanced scrollbar */
//         ::-webkit-scrollbar {
//           width: 3px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0);
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(45deg, #a855f7, #ec4899);
//           border-radius: 10px;
//         }

//         /* Input focus glow */
//         input:focus {
//           box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
//         }

//         /* Button hover glow */
//         button:hover:not(:disabled) {
//           box-shadow: 0 10px 40px rgba(168, 85, 247, 0.4);
//         }
//       `}</style>
//         </div>
//     );
// };

// export default EnhancedLogin;



import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { googleAuth } from "../api.js";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Check,
    Sparkles,
    Brain,
    Zap,
    Shield,
    ChevronRight
} from 'lucide-react';

const EnhancedLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [loginMode, setLoginMode] = useState('default'); // 'default', 'loading', 'success', 'error'
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Invalid email or password. Please try again.');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);
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

    // 3D transform based on mouse position
    const getTransform = (intensity = 1) => {
        const x = (mousePosition.x - window.innerWidth / 2) / 50 * intensity;
        const y = (mousePosition.y - window.innerHeight / 2) / 50 * intensity;
        return `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    };

    // Mouse tracking for 3D effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Particle system
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 30;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



   return( <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Particle Canvas Background */}
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ mixBlendMode: 'multiply' }}
        />

        {/* Gradient Overlays */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-purple-50/20" />
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-50/20 via-transparent to-purple-100/10" />
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 80%)',
                    backgroundSize: '150% 150%',
                    animation: 'gradientFloat 20s ease-in-out infinite alternate'
                }}
            />
        </div>

        {/* Navigation Header */}
        <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 mb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <h1 className="text-2xl font-black text-purple-600"
                            onClick={() => navigate("/")}>
                            Groweza
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <button className="px-6 py-2 border border-purple-300 text-purple-600 hover:text-purple-700 hover:border-purple-400 rounded-lg transition-all duration-300 cursor-pointer"
                            onClick={() => navigate("/")}>
                            Back to Home
                        </button>
                    </nav>
                </div>
            </div>
        </header>

        {/* Main Login Container */}
        <div className="relative z-10 w-full max-w-md mx-4 mt-30">
            <div
                className="relative group"
                style={{ transform: getTransform(0.3) }}
            >
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200/40 via-purple-300/30 to-purple-200/40 rounded-3xl blur-3xl scale-110 group-hover:scale-125 transition-transform duration-700" />

                {/* Main card */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
                    {/* Top accent bar */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500"
                        style={{ animation: 'shimmer 3s ease-in-out infinite' }}
                    />

                    <div className="p-8">
                        {/* Logo and title */}
                        <div className="flex items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Groweza
                                </h2>
                                <p className="text-xs text-gray-600">AI-Powered Freelancer Dashboard</p>
                            </div>
                        </div>

                        {/* Success State */}
                        {loginMode === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-10">
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 relative">
                                    <div className="absolute inset-0 rounded-full bg-green-200 animate-ping" />
                                    <Check className="text-green-600" size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h3>
                                <p className="text-gray-600 text-center">
                                    Initializing your AI dashboard...
                                </p>
                                <div className="flex items-center space-x-2 mt-4">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Header */}
                                <div className="mb-8">
                                    <div className="flex items-center mb-4">
                                        <Sparkles className="text-purple-500 mr-2" size={20} />
                                        <span className="text-sm font-medium text-purple-600">AI-Powered Login</span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                                    <p className="text-gray-600">
                                        Access your intelligent freelance dashboard
                                    </p>
                                </div>

                                {/* Error Message */}
                                {loginMode === 'error' && (
                                    <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 backdrop-blur-sm">
                                        <div className="flex items-center text-red-600">
                                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                            </div>
                                            <span className="text-sm">{errorMessage}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Login Form */}
                                <div className="space-y-6">
                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-purple-200/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={18} />
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={credentials.email}
                                                    onChange={handleChange}
                                                    placeholder="demo@groweza.com"
                                                    required
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 backdrop-blur-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-purple-200/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={18} />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    name="password"
                                                    value={credentials.password}
                                                    onChange={handleChange}
                                                    placeholder="demo123"
                                                    required
                                                    className="w-full pl-12 pr-12 py-4 bg-gray-50/80 border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 backdrop-blur-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10 cursor-pointer"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sign In Button */}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="w-full relative group bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-300/50 cursor-pointer"
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            {loginMode === 'loading' ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                                                    Authenticating...
                                                </>
                                            ) : (
                                                <>
                                                    Sign In to Dashboard
                                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                                                </>
                                            )}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="flex items-center my-8">
                                    <div className="flex-1 border-t border-gray-300" />
                                    <span className="px-4 text-xs text-gray-500">or continue with</span>
                                    <div className="flex-1 border-t border-gray-300" />
                                </div>

                                {/* Google Sign In */}
                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                    className="w-full group relative bg-white border border-gray-300 rounded-2xl p-4 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 cursor-pointer"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                            <svg width="18" height="18" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 font-medium">Continue with Google</span>
                                    </div>
                                </button>

                                {/* Sign Up Link */}
                                <div className="text-center mt-8">
                                    <p className="text-gray-600">
                                        Don't have an account?{' '}
                                        <a
                                            href="/signup"
                                            className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center group transition-colors"
                                        >
                                            Sign up for free
                                            <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </a>
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center justify-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                    <Shield size={12} />
                    <span>256-bit SSL</span>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Brain size={12} />
                    <span>AI-Secured</span>
                </div>
            </div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
        @keyframes gradientFloat {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-20px) scale(1.05);
            opacity: 0.3;
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Enhanced scrollbar */
        ::-webkit-scrollbar {
          width: 3px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(243, 244, 246);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #9333ea, #7c3aed);
          border-radius: 10px;
        }

        /* Input focus glow */
        input:focus {
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.2);
        }

        /* Button hover glow */
        button:hover:not(:disabled) {
          box-shadow: 0 10px 40px rgba(147, 51, 234, 0.3);
        }
      `}</style>
    </div>
    );
};

export default EnhancedLogin;
