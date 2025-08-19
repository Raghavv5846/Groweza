// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//     Menu,
//     X,
//     ArrowRight,
//     Play,
//     Users,
//     CreditCard,
//     FileText,
//     Calendar,
//     Bell,
//     Check,
//     Star,
//     Sparkles,
//     Zap,
//     Globe,
//     Shield,
//     TrendingUp,
//     Brain,
//     Rocket,
//     Eye,
//     Heart,
//     Receipt,
//     Briefcase,
//     MessageCircle,
//     Clock,
//     Cpu,
//     Timer,
//     Repeat,
//     ShieldCheck
// } from 'lucide-react';
// import { motion, useScroll, useTransform } from "framer-motion";
// import BlurText from './react-bits/BlurText';
// import TextType from './react-bits/TypeText';
// import GradientText from './react-bits/GradientText';
// import ShinyText from './react-bits/ShineyText';
// import SpotlightCard from './react-bits/SpotLightCard';
// import { useNavigate } from 'react-router-dom';

// const GrowezaLanding = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [scrollY, setScrollY] = useState(0);
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//     const [isVisible, setIsVisible] = useState({});
//     const heroRef = useRef(null);
//     const canvasRef = useRef(null);
//     const navigate = useNavigate();
//     const dashboardref = useRef(null);


//     // Advanced scroll and mouse tracking
//     useEffect(() => {
//         const handleScroll = () => setScrollY(window.scrollY);
//         const handleMouseMove = (e) => {
//             setMousePosition({ x: e.clientX, y: e.clientY });
//         };

//         window.addEventListener('scroll', handleScroll);
//         window.addEventListener('mousemove', handleMouseMove);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//             window.removeEventListener('mousemove', handleMouseMove);
//         };
//     }, []);

//     // Intersection Observer for scroll animations
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     setIsVisible(prev => ({
//                         ...prev,
//                         [entry.target.id]: entry.isIntersecting
//                     }));
//                 });
//             },
//             { threshold: 0.1 }
//         );

//         document.querySelectorAll('[data-animate]').forEach((el) => {
//             observer.observe(el);
//         });

//         return () => observer.disconnect();
//     }, []);

//     // Particle system canvas
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         const particles = [];
//         const particleCount = 50;

//         class Particle {
//             constructor() {
//                 this.x = Math.random() * canvas.width;
//                 this.y = Math.random() * canvas.height;
//                 this.vx = (Math.random() - 0.5) * 0.5;
//                 this.vy = (Math.random() - 0.5) * 0.5;
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
//                 ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
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

//             // Connect nearby particles
//             particles.forEach((a, i) => {
//                 particles.slice(i + 1).forEach(b => {
//                     const dx = a.x - b.x;
//                     const dy = a.y - b.y;
//                     const distance = Math.sqrt(dx * dx + dy * dy);

//                     if (distance < 100) {
//                         ctx.beginPath();
//                         ctx.moveTo(a.x, a.y);
//                         ctx.lineTo(b.x, b.y);
//                         ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
//                         ctx.lineWidth = 0.5;
//                         ctx.stroke();
//                     }
//                 });
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

//     const scrollToSection = (sectionId) => {
//         document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
//         setIsMenuOpen(false);
//     };

//     // 3D transform based on mouse position
//     const getTransform = (intensity = 1) => {
//         const x = (mousePosition.x - window.innerWidth / 2) / 50 * intensity;
//         const y = (mousePosition.y - window.innerHeight / 2) / 50 * intensity;
//         return `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
//     };

//     const navItems = ['Home', 'Features', 'Pricing', 'Testimonials', 'Contact'];

//     const containerVariants = {
//         hidden: {},
//         visible: {
//             transition: {
//                 staggerChildren: 0.15 // delay between each item
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: -20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
//     };


//     const { scrollYProgress } = useScroll({
//         target: dashboardref,
//         offset: ["start end", "center center"] // triggers when section enters
//     });

//     // Map scroll progress to rotationX (from -75° to 0°)
//     const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
//     const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]); // optional fade-in


//     return (
//         <div className="min-h-screen bg-black text-white overflow-hidden relative">
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
//             </div>

//             {/* Navigation */}


//             <motion.nav
//                 initial="hidden"
//                 animate="visible"
//                 variants={containerVariants}
//                 className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50
//                     ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
//                     : 'bg-transparent'
//                     }`}
//             >
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between items-center h-20">

//                         {/* Logo */}
//                         <motion.div variants={itemVariants} className="flex-shrink-0">
//                             <h1
//                                 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer"
//                                 onClick={() => navigate('/')}
//                             >
//                                 Groweza
//                             </h1>
//                         </motion.div>

//                         {/* Desktop Menu */}
//                         <div className="hidden md:block">
//                             <div className="ml-10 flex items-center space-x-8">
//                                 {navItems.map((item, index) => (
//                                     <motion.button
//                                         key={item}
//                                         variants={itemVariants}
//                                         onClick={() => scrollToSection(item.toLowerCase())}
//                                         className="relative text-xl text-gray-300 hover:text-white transition-all duration-300 group font-medium cursor-pointer"
//                                     >
//                                         <ShinyText text={item} disabled={false} speed={3} className='custom-class' />
//                                         <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full cursor-pointer" />
//                                     </motion.button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Desktop Buttons */}
//                         <div className="hidden md:flex items-center space-x-4">
//                             <motion.button
//                                 variants={itemVariants}
//                                 className="text-gray-300 hover:text-white transition-all duration-300 font-medium cursor-pointer"
//                                 onClick={() => navigate('/login')}
//                             >
//                                 Login
//                             </motion.button>
//                             <motion.button
//                                 variants={itemVariants}
//                                 className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
//                                 onClick={() => navigate('/signup')}
//                             >
//                                 <span className="relative z-10">Sign Up</span>
//                                 <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                             </motion.button>
//                         </div>

//                         {/* Mobile menu button */}
//                         <motion.div variants={itemVariants} className="md:hidden">
//                             <button
//                                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                                 className="text-gray-300 hover:text-white transition-colors p-2"
//                             >
//                                 {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//                             </button>
//                         </motion.div>
//                     </div>
//                 </div>
//             </motion.nav>

//             {/* Hero Section */}
//             <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
//                     <div className="text-center max-w-5xl mx-auto">
//                         {/* Floating icons around hero */}
//                         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                             {[Brain, Rocket, Zap, Globe, Shield, TrendingUp].map((Icon, i) => (
//                                 <Icon
//                                     key={i}
//                                     className="absolute text-purple-500/20"
//                                     size={32}
//                                     style={{
//                                         left: `${20 + i * 15}%`,
//                                         top: `${30 + (i % 3) * 20}%`,
//                                         transform: `${getTransform(0.3)} translateZ(${i * 10}px)`,
//                                         animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
//                                         animationDelay: `${i * 0.2}s`
//                                     }}
//                                 />
//                             ))}
//                         </div>

//                         <div className="space-y-8 relative">
//                             {/* Animated badge */}
//                             <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-sm">
//                                 <Sparkles className="mr-2 text-yellow-400" size={16} />
//                                 <span className="text-sm font-medium text-gray-300">
//                                     <TextType
//                                         text={["AI-Powered Freelance Revolution"]}
//                                         typingSpeed={75}
//                                         pauseDuration={1500}
//                                         showCursor={true}
//                                         cursorCharacter="|"
//                                     />
//                                 </span>
//                             </div>

//                             <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight">
//                                 <span className="block mb-4">
//                                     <BlurText
//                                         textComponent={({ text }) => (
//                                             <svg
//                                                 viewBox="0 0 800 80"
//                                                 className="w-full h-auto"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <defs>
//                                                     <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                                                         <stop offset="0%" stopColor="white" />
//                                                         <stop offset="50%" stopColor="#d1d5db" /> {/* via-gray-200 */}
//                                                         <stop offset="100%" stopColor="#9ca3af" /> {/* to-gray-400 */}
//                                                     </linearGradient>
//                                                 </defs>
//                                                 <text
//                                                     x="0"
//                                                     y="60"
//                                                     fontSize="60"
//                                                     fontWeight="bold"
//                                                     fill="url(#textGradient)"
//                                                 >
//                                                     {text}
//                                                 </text>
//                                             </svg>
//                                         )}
//                                         text="Run Your Freelance Business"
//                                         delay={150}
//                                         animateBy="words"
//                                         direction="top"
//                                     />
//                                 </span>


//                                 <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//                                     Without the Chaos
//                                 </span>
//                             </h1>

//                             <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
//                                 <p className="opacity-90">
//                                     Stop juggling spreadsheets, endless emails, and multiple apps.
//                                 </p>
//                                 <p className="opacity-90">
//                                     <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text font-semibold">Groweza's AI</span> manages clients, sends proposals, schedules meetings, and processes payments — all from one beautiful, intelligent dashboard.
//                                 </p>

//                             </div>

//                             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
//                                 <button className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-12 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 cursor-pointer"
//                                 onClick={() => navigate('/login')}>
//                                     <span className="relative z-10 flex items-center">
//                                         Start Free Trial
//                                         <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
//                                     </span>
//                                     <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                                     <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
//                                 </button>

//                                 <button
//                                     onClick={() => scrollToSection('features')}
//                                     className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 px-8 py-4 rounded-full border border-gray-600 hover:border-purple-500 hover:bg-purple-500/10 cursor-pointer"
//                                 >
//                                     <div className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:scale-110 transition-transform duration-300">
//                                         <Play size={16} fill="white" />
//                                     </div>
//                                     <span className="font-semibold">See How It Works</span>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* 3D Dashboard Preview */}
//                     <motion.div
//                         ref={dashboardref}
//                         style={{
//                             rotateX,
//                             opacity,
//                             transformPerspective: 1000, // important for 3D look
//                         }}
//                     >

//                         <div className="mt-20 relative w-7xl mx-auto">
//                             <div
//                                 className="relative group"
//                                 style={{ transform: getTransform(0.5) }}
//                             >
//                                 {/* Glowing background */}
//                                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-3xl scale-110 group-hover:scale-125 transition-transform duration-700" />

//                                 {/* Main dashboard */}
//                                 <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl group-hover:border-purple-500/30 transition-all duration-500 h-100vh">
//                                     <div className="flex items-center justify-between mb-8">
//                                         <div className="flex items-center space-x-4">
//                                             <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
//                                                 <Brain className="text-white" size={24} />
//                                             </div>
//                                             <div>
//                                                 <h3 className="text-2xl font-bold text-white">Groweza Dashboard</h3>
//                                                 <p className="text-gray-400">Everything automated, beautifully</p>
//                                             </div>
//                                         </div>
//                                         <div className="flex space-x-2">
//                                             <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
//                                             <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
//                                             <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
//                                         </div>
//                                     </div>

//                                     {/* Animated cards */}
//                                     <div className="grid md:grid-cols-3 gap-6">
//                                         {[
//                                             { icon: FileText, label: "AI Proposal Generated", value: "$2,400", color: "from-green-500 to-emerald-500" },
//                                             { icon: Calendar, label: "Smart Meeting Booked", value: "Tomorrow 2PM", color: "from-blue-500 to-cyan-500" },
//                                             { icon: CreditCard, label: "Payment Processed", value: "$1,200", color: "from-purple-500 to-pink-500" },
//                                             { icon: Users, label: "New Clients This Month", value: "+3", color: "from-yellow-400 to-orange-500" },
//                                             { icon: Receipt, label: "Pending Invoices", value: "$850", color: "from-red-400 to-pink-500" },
//                                             { icon: Briefcase, label: "Projects In Progress", value: "4 Active", color: "from-indigo-400 to-indigo-600" },
//                                         ].map((item, index) => (
//                                             <div
//                                                 key={index}
//                                                 className="relative group/card bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-105"
//                                                 style={{
//                                                     animation: `slideUp ${0.8 + index * 0.2}s ease-out`,
//                                                     animationDelay: `${index * 0.3}s`,
//                                                     animationFillMode: 'backwards'
//                                                 }}
//                                             >
//                                                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
//                                                 <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform duration-300`}>
//                                                     <item.icon className="text-white" size={20} />
//                                                 </div>
//                                                 <h4 className="text-white font-semibold mb-2">{item.label}</h4>
//                                                 <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
//                                                     {item.value}
//                                                 </p>
//                                                 <div className="absolute top-4 right-4">
//                                                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     {/* Stats bar */}
//                                     <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/10">
//                                         {[
//                                             { label: "Revenue", value: "+127%", icon: TrendingUp },
//                                             { label: "Time Saved", value: "23hrs/week", icon: Zap },
//                                             { label: "Client Satisfaction", value: "98%", icon: Heart },

//                                             { label: "Tasks Automated", value: "320+", icon: Cpu },
//                                             { label: "Avg. Project Delivery", value: "2.3 days faster", icon: Timer },
//                                             { label: "Return Clients", value: "85%", icon: Repeat },
//                                             { label: "Error Reduction", value: "-72%", icon: ShieldCheck },
//                                             { label: "Growth in Leads", value: "+45%", icon: Users }
//                                         ].map((stat, i) => (
//                                             <div key={i} className="flex items-center space-x-2">
//                                                 <stat.icon className="text-purple-400" size={16} />
//                                                 <span className="text-gray-400 text-sm">{stat.label}:</span>
//                                                 <span className="text-white font-bold">{stat.value}</span>
//                                             </div>
//                                         ))}
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Pain Points Section */}
//             <section
//                 id="pain-points"
//                 className="py-32 relative"
//                 data-animate
//             >
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                     <div className="text-center mb-20">
//                         <div className="inline-flex items-center px-6 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm mb-8">
//                             <span className="text-sm font-medium text-red-400">The Problem</span>
//                         </div>
//                         <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">
//                             Why Freelancers <span className="text-transparent bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text">Burn Out</span>
//                         </h2>
//                         <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//                             We analyzed the workflows of 10,000+ freelancers. The pain points are universal:
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {[
//                             {
//                                 title: "Tool Chaos",
//                                 description: "Switching between 7+ apps daily. Your brain isn't a task switcher.",
//                                 icon: "🔄",
//                                 gradient: "from-red-500/20 to-pink-500/20",
//                                 border: "border-red-500/30"
//                             },
//                             {
//                                 title: "Payment Hell",
//                                 description: "Chasing clients for money you've already earned. Awkward. Exhausting.",
//                                 icon: "💸",
//                                 gradient: "from-orange-500/20 to-red-500/20",
//                                 border: "border-orange-500/30"
//                             },
//                             {
//                                 title: "Lost Money",
//                                 description: "Every missed follow-up is $500-2000 walking out the door.",
//                                 icon: "📉",
//                                 gradient: "from-yellow-500/20 to-orange-500/20",
//                                 border: "border-yellow-500/30"
//                             },
//                             {
//                                 title: "Time Vampire",
//                                 description: "Admin tasks steal 25+ hours/week. That's $2500+ in lost billable time.",
//                                 icon: "⏰",
//                                 gradient: "from-purple-500/20 to-pink-500/20",
//                                 border: "border-purple-500/30"
//                             }
//                         ].map((pain, index) => (
//                             <SpotlightCard
//                                 key={index}
//                                 spotlightColor="rgba(0, 229, 255, 0.2)"
//                                 className={`custom-spotlight-card group relative bg-gradient-to-br ${pain.gradient} backdrop-blur-xl rounded-3xl p-8 border ${pain.border} hover:scale-105 transition-all duration-500 hover:shadow-2xl`}
//                                 style={{
//                                     transform: isVisible['pain-points'] ? 'translateY(0)' : 'translateY(50px)',
//                                     opacity: isVisible['pain-points'] ? 1 : 0,
//                                     transitionDelay: `${index * 0.2}s`
//                                 }}
//                             >
//                                 <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
//                                     {pain.icon}
//                                 </div>
//                                 <h3 className="text-2xl font-bold mb-4 text-white">{pain.title}</h3>
//                                 <p className="text-gray-300 leading-relaxed">{pain.description}</p>

//                                 {/* Hover glow */}
//                                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                             </SpotlightCard>

//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Solution Overview */}
//             <section
//                 id="features"
//                 className="py-32 relative"
//                 data-animate
//             >
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                     <div className="text-center mb-20">
//                         <div className="inline-flex items-center px-6 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm mb-8">
//                             <Sparkles className="mr-2 text-green-400" size={16} />
//                             <span className="text-sm font-medium text-green-400">The Solution</span>
//                         </div>
//                         <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">
//                             One Dashboard. <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">Zero Headaches.</span>
//                         </h2>
//                         <p className="text-xl text-gray-400 max-w-4xl mx-auto">
//                             From first contact to final payment, Groweza's AI handles everything — so you can focus on what actually makes money.
//                         </p>
//                     </div>

//                     <div className="space-y-20">
//                         {[
//                             {
//                                 icon: Brain,
//                                 title: "AI Client Management",
//                                 description: "Our AI learns your clients' patterns, predicts their needs, and automates relationship management. Never lose a deal to poor follow-up again.",
//                                 features: ["Smart contact scoring", "Automated relationship tracking", "Predictive insights"],
//                                 color: "from-purple-500 to-pink-500",
//                                 side: "left",
//                                 image: "/Client Management.jpeg"
//                             },
//                             {
//                                 icon: Zap,
//                                 title: "Lightning Invoicing",
//                                 description: "Create branded invoices in 3 seconds, not 30 minutes. AI suggests optimal pricing based on market rates and client history.",
//                                 features: ["Instant invoice generation", "Smart pricing recommendations", "One-click payments"],
//                                 color: "from-blue-500 to-cyan-500",
//                                 side: "right",
//                                 image: "/invoice management.jpeg"
//                             },
//                             {
//                                 icon: FileText,
//                                 title: "AI Proposal Engine",
//                                 description: "Generate winning proposals that close deals. Our AI analyzes 100,000+ successful proposals to craft yours.",
//                                 features: ["AI-powered writing", "Win rate optimization", "Template learning"],
//                                 color: "from-green-500 to-emerald-500",
//                                 side: "left",
//                                 image: "/Proposal Management.jpeg"
//                             },
//                             {
//                                 icon: Calendar,
//                                 title: "Smart Scheduling",
//                                 description: "AI finds the perfect meeting times, handles reschedules, and even prep briefs. Your calendar becomes your assistant.",
//                                 features: ["Intelligent availability", "Auto conflict resolution", "Meeting preparation"],
//                                 color: "from-purple-500 to-black-500",
//                                 side: "right",
//                                 image: "/meeting scheduler.jpeg"
//                             }
//                         ].map((feature, index) => (
//                             <div
//                                 key={index}
//                                 className={`flex items-center ${feature.side === 'right' ? 'flex-row-reverse' : ''}`}
//                                 style={{
//                                     transform: isVisible['features'] ? 'translateX(0)' : `translateX(${feature.side === 'right' ? '100px' : '-100px'})`,
//                                     opacity: isVisible['features'] ? 1 : 0,
//                                     transitionDelay: `${index * 0.3}s`,
//                                     transition: 'all 0.8s ease-out'
//                                 }}
//                             >
//                                 <div className={`flex-1 ${feature.side === 'right' ? 'pl-12' : 'pr-12'}`}>
//                                     <div className="space-y-6">
//                                         <div className="flex items-center space-x-4">
//                                             <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
//                                                 <feature.icon className="text-white" size={32} />
//                                             </div>
//                                             <h3 className="text-3xl font-bold text-white">{feature.title}</h3>
//                                         </div>

//                                         <p className="text-xl text-gray-300 leading-relaxed">
//                                             {feature.description}
//                                         </p>

//                                         <div className="space-y-3">
//                                             {feature.features.map((feat, i) => (
//                                                 <div key={i} className="flex items-center space-x-3">
//                                                     <div className={`w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
//                                                         <Check className="text-white" size={14} />
//                                                     </div>
//                                                     <span className="text-gray-300">{feat}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="flex-1">
//                                     <div className="relative group" style={{ transform: getTransform(0.2) }}>
//                                         <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-20 rounded-3xl blur-3xl group-hover:opacity-30 transition-opacity duration-700`} />
//                                         <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-2 border border-white/10 group-hover:border-purple-500/30 transition-all duration-500">
//                                             <div className="aspect-video rounded-2xl overflow-hidden">
//                                                 <img
//                                                     src={feature.image}
//                                                     alt={feature.title}
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Pricing Section */}
//             <section
//                 id="pricing"
//                 className="py-32 relative"
//                 data-animate
//             >
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                     <div className="text-center mb-20">
//                         <div className="inline-flex items-center px-6 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm mb-8">
//                             <span className="text-sm font-medium text-green-400">Transparent Pricing</span>
//                         </div>
//                         <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">
//                             Pricing That <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">Actually Makes Sense</span>
//                         </h2>
//                         <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//                             Built for real freelancers, not enterprise bureaucracy. Pay less than your coffee budget to 10x your business.
//                         </p>
//                     </div>

//                     <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
//                         {/* Basic Plan */}
//                         <div
//                             className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-105"
//                             style={{
//                                 transform: isVisible['pricing'] ? 'translateY(0)' : 'translateY(50px)',
//                                 opacity: isVisible['pricing'] ? 1 : 0,
//                                 transitionDelay: '0.2s'
//                             }}
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                             <div className="relative z-10">
//                                 <div className="text-center mb-10">
//                                     <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-500/20 border border-gray-400/30 mb-6">
//                                         <span className="text-sm font-medium text-gray-300">Getting Started</span>
//                                     </div>
//                                     <h3 className="text-3xl font-bold text-white mb-4">Basic Plan</h3>
//                                     <div className="flex items-baseline justify-center">
//                                         <span className="text-6xl font-black text-white">$11</span>
//                                         <span className="text-2xl text-gray-400 ml-2">/month</span>
//                                     </div>
//                                     <p className="text-gray-400 mt-4">Perfect for growing freelancers who need the essentials</p>
//                                 </div>

//                                 <ul className="space-y-4 mb-10">
//                                     {[
//                                         "15 Clients",
//                                         "20 Invoices/month",
//                                         "16 Proposals/month",
//                                         "3 AI-scheduled meetings/month",
//                                         "Basic automation templates",
//                                         "Email support"
//                                     ].map((feature, index) => (
//                                         <li key={index} className="flex items-center space-x-4">
//                                             <div className="w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
//                                                 <Check className="text-white" size={16} />
//                                             </div>
//                                             <span className="text-gray-300">{feature}</span>
//                                         </li>
//                                     ))}
//                                 </ul>

//                                 <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-2xl font-bold text-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
//                                     Start Basic Plan
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Premium Plan */}
//                         <div
//                             className="group relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-10 border-2 border-purple-500/40 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 shadow-2xl shadow-purple-500/20"
//                             style={{
//                                 transform: isVisible['pricing'] ? 'translateY(0)' : 'translateY(50px)',
//                                 opacity: isVisible['pricing'] ? 1 : 0,
//                                 transitionDelay: '0.4s'
//                             }}
//                         >
//                             {/* Popular badge */}
//                             <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
//                                 <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg">
//                                     ⚡ MOST POPULAR
//                                 </div>
//                             </div>

//                             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                             <div className="relative z-10">
//                                 <div className="text-center mb-10">
//                                     <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/40 mb-6">
//                                         <Sparkles className="mr-2 text-yellow-400" size={16} />
//                                         <span className="text-sm font-medium text-purple-300">AI-Powered</span>
//                                     </div>
//                                     <h3 className="text-3xl font-bold text-white mb-4">Premium Plan</h3>
//                                     <div className="flex items-baseline justify-center">
//                                         <span className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">$21</span>
//                                         <span className="text-2xl text-gray-400 ml-2">/month</span>
//                                     </div>
//                                     <p className="text-gray-300 mt-4">For professionals ready to dominate their market</p>
//                                 </div>

//                                 <ul className="space-y-4 mb-10">
//                                     {[
//                                         "Unlimited Clients & Invoices",
//                                         "Unlimited AI-generated proposals",
//                                         "Unlimited smart meetings",
//                                         "Advanced AI automation",
//                                         "Custom domain portfolio",
//                                         "Priority support + AI chat"
//                                     ].map((feature, index) => (
//                                         <li key={index} className="flex items-center space-x-4">
//                                             <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
//                                                 <Check className="text-white" size={16} />
//                                             </div>
//                                             <span className="text-white font-medium">{feature}</span>
//                                         </li>
//                                     ))}
//                                 </ul>

//                                 <button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group/btn">
//                                     <span className="relative z-10">Start Premium Plan</span>
//                                     <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
//                                 </button>
//                             </div>

//                             {/* Premium glow effect */}
//                             <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
//                         </div>
//                     </div>

//                     <div className="text-center mt-16">
//                         <button className="group inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold text-lg transition-all duration-300">
//                             <span>Compare All Features</span>
//                             <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={20} />
//                         </button>
//                     </div>

//                     {/* ROI Calculator */}
//                     <div className="mt-20 max-w-4xl mx-auto">
//                         <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20">
//                             <div className="text-center mb-8">
//                                 <h3 className="text-2xl font-bold text-white mb-4">💰 ROI Calculator</h3>
//                                 <p className="text-gray-300">See how much Groweza saves you:</p>
//                             </div>

//                             <div className="grid md:grid-cols-3 gap-6 text-center">
//                                 <div className="space-y-2">
//                                     <div className="text-3xl font-bold text-green-400">25hrs</div>
//                                     <div className="text-sm text-gray-400">Saved per week</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <div className="text-3xl font-bold text-green-400">$2,500</div>
//                                     <div className="text-sm text-gray-400">Extra monthly revenue</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <div className="text-3xl font-bold text-green-400">11,900%</div>
//                                     <div className="text-sm text-gray-400">ROI (vs $21/month)</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Testimonials */}
//             <section
//                 id="testimonials"
//                 className="py-32 relative"
//                 data-animate
//             >
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                     <div className="text-center mb-20">
//                         <div className="inline-flex items-center px-6 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-sm mb-8">
//                             <Star className="mr-2 text-yellow-400" size={16} />
//                             <span className="text-sm font-medium text-yellow-400">Social Proof</span>
//                         </div>
//                         <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">
//                             Freelancers Are <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">Obsessed</span>
//                         </h2>
//                         <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//                             Join 50,000+ freelancers who've transformed their business with Groweza
//                         </p>
//                     </div>

//                     <div className="grid lg:grid-cols-3 gap-8">
//                         {[
//                             {
//                                 quote: "I went from struggling to book 2 clients to managing 15+ simultaneously. Groweza's AI literally runs my business while I focus on design. Revenue up 340% in 6 months.",
//                                 author: "Priya K.",
//                                 role: "UX Designer",
//                                 avatar: "P",
//                                 color: "from-purple-500 to-pink-500",
//                                 metrics: { revenue: "+340%", clients: "15 active", time: "30hrs saved/week" }
//                             },
//                             {
//                                 quote: "The AI proposal feature is pure magic. It writes better proposals than I ever could, and my close rate went from 20% to 80%. I'm not exaggerating.",
//                                 author: "Mark R.",
//                                 role: "Web Developer",
//                                 avatar: "M",
//                                 color: "from-blue-500 to-cyan-500",
//                                 metrics: { closeRate: "80%", proposals: "50+ monthly", income: "+$8K/month" }
//                             },
//                             {
//                                 quote: "My clients think I have a full team now. The automated follow-ups and smart scheduling make me look like a Fortune 500 company. Best investment ever.",
//                                 author: "Sara M.",
//                                 role: "Marketing Consultant",
//                                 avatar: "S",
//                                 color: "from-green-500 to-emerald-500",
//                                 metrics: { clients: "23 active", referrals: "+60%", satisfaction: "98%" }
//                             }
//                         ].map((testimonial, index) => (
//                             <div
//                                 key={index}
//                                 className={`group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-105`}
//                                 style={{
//                                     transform: isVisible['testimonials'] ? 'translateY(0)' : 'translateY(50px)',
//                                     opacity: isVisible['testimonials'] ? 1 : 0,
//                                     transitionDelay: `${index * 0.2}s`
//                                 }}
//                             >
//                                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                                 <div className="relative z-10">
//                                     {/* Stars */}
//                                     <div className="flex text-yellow-400 mb-6">
//                                         {[...Array(5)].map((_, i) => (
//                                             <Star
//                                                 key={i}
//                                                 size={20}
//                                                 fill="currentColor"
//                                                 className="animate-pulse"
//                                                 style={{ animationDelay: `${i * 0.1}s` }}
//                                             />
//                                         ))}
//                                     </div>

//                                     {/* Quote */}
//                                     <blockquote className="text-lg text-gray-300 mb-8 italic leading-relaxed">
//                                         "{testimonial.quote}"
//                                     </blockquote>

//                                     {/* Metrics */}
//                                     <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white/5 rounded-2xl">
//                                         {Object.entries(testimonial.metrics).map(([key, value], i) => (
//                                             <div key={i} className="text-center">
//                                                 <div className={`text-lg font-bold bg-gradient-to-r ${testimonial.color} bg-clip-text text-transparent`}>
//                                                     {value}
//                                                 </div>
//                                                 <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     {/* Author */}
//                                     <div className="flex items-center space-x-4">
//                                         <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
//                                             {testimonial.avatar}
//                                         </div>
//                                         <div>
//                                             <div className="font-bold text-white text-lg">{testimonial.author}</div>
//                                             <div className="text-gray-400">{testimonial.role}</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Trust badges */}
//                     <div className="mt-20 text-center">
//                         <div className="inline-flex items-center space-x-8 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
//                             <div className="flex items-center space-x-2">
//                                 <Shield className="text-green-400" size={24} />
//                                 <span className="text-white font-semibold">SOC 2 Certified</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Eye className="text-blue-400" size={24} />
//                                 <span className="text-white font-semibold">GDPR Compliant</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Heart className="text-red-400" size={24} />
//                                 <span className="text-white font-semibold">99.9% Uptime</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Final CTA */}
//             <section className="py-32 relative">
//                 <div className="absolute inset-0">
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 blur-3xl" />
//                 </div>

//                 <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
//                     <div className="space-y-8">
//                         <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/40 backdrop-blur-sm">
//                             <Rocket className="mr-2 text-purple-400" size={16} />
//                             <span className="text-sm font-medium text-purple-300">Transform Your Business</span>
//                         </div>

//                         <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
//                             Stop Managing. <br />
//                             Start <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text">Dominating.</span>
//                         </h2>

//                         <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//                             Join the AI revolution. Let Groweza handle the boring stuff while you focus on what you love: creating amazing work and making serious money.
//                         </p>

//                         <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
//                             <button className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-12 py-6 rounded-full font-bold text-xl overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 cursor-pointer"
//                             onClick={()=>navigate("/login")}>
//                                 <span className="relative z-10 flex items-center ">
//                                     Start Your Transformation
//                                     <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform duration-300" size={24} />
//                                 </span>
//                                 <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                                 <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
//                             </button>

//                             <div className="text-center sm:text-left">
//                                 <div className="text-sm text-gray-400">Free 14-day trial • No credit card required</div>
//                                 <div className="text-sm text-gray-500">Cancel anytime • 30-day money-back guarantee</div>
//                             </div>
//                         </div>

//                         {/* Live stats */}
//                         <div className="pt-16">
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
//                                 {[
//                                     { label: "Active Users", value: "50,247", icon: Users },
//                                     { label: "Revenue Generated", value: "$127M+", icon: TrendingUp },
//                                     { label: "Hours Saved", value: "2.1M+", icon: Zap },
//                                     { label: "Client Satisfaction", value: "98.7%", icon: Heart }
//                                 ].map((stat, i) => (
//                                     <div key={i} className="text-center">
//                                         <stat.icon className="mx-auto mb-3 text-purple-400" size={32} />
//                                         <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
//                                         <div className="text-sm text-gray-400">{stat.label}</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer id="contact" className="relative bg-gradient-to-br from-gray-900 to-black py-20 border-t border-white/10">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                     <div className="grid md:grid-cols-5 gap-12">
//                         {/* Brand */}
//                         <div className="md:col-span-2">
//                             <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
//                                 Groweza
//                             </h3>
//                             <p className="text-gray-400 mb-6 max-w-md">
//                                 The AI-powered platform that transforms freelancers into business powerhouses. Join the revolution.
//                             </p>
//                             <div className="flex space-x-4">
//                                 {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
//                                     <a
//                                         key={social}
//                                         href="#"
//                                         className="w-12 h-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-pink-600/40 transition-all duration-300"
//                                     >
//                                         {social[0]}
//                                     </a>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Links */}
//                         {[
//                             {
//                                 title: "Product",
//                                 links: ["Features", "Pricing", "AI Dashboard", "Integrations", "API"]
//                             },
//                             {
//                                 title: "Resources",
//                                 links: ["Blog", "Case Studies", "Templates", "Community", "Academy"]
//                             },
//                             {
//                                 title: "Support",
//                                 links: ["Help Center", "Contact", "Status", "Privacy", "Terms"]
//                             }
//                         ].map((section) => (
//                             <div key={section.title}>
//                                 <h4 className="font-bold text-white mb-6">{section.title}</h4>
//                                 <ul className="space-y-3">
//                                     {section.links.map((link) => (
//                                         <li key={link}>
//                                             <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
//                                                 {link}
//                                             </a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
//                         <p className="text-gray-400 text-sm">
//                             © 2025 Groweza. All rights reserved. Built with 🤖 AI and ❤️ for freelancers.
//                         </p>
//                         <div className="flex items-center space-x-4 mt-4 md:mt-0">
//                             <span className="text-xs text-gray-500">Powered by</span>
//                             <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                                 <span className="text-xs text-gray-400">AI Engine v2.0</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </footer>

//             {/* Custom CSS for advanced animations */}
//             <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotateZ(0deg); }
//           25% { transform: translateY(-10px) rotateZ(1deg); }
//           50% { transform: translateY(-5px) rotateZ(0deg); }
//           75% { transform: translateY(-15px) rotateZ(-1deg); }
//         }

//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         @keyframes pulse-glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
//           50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
//         }

//         @keyframes gradient-shift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient-shift 3s ease infinite;
//         }

//         /* Smooth scrolling */
//         html {
//           scroll-behavior: smooth;
//         }

//         /* Custom scrollbar */
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

//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(45deg, #9333ea, #db2777);
//         }

//         /* Enhanced glow effects */
//         .glow-purple {
//           box-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
//         }

//         .glow-pink {
//           box-shadow: 0 0 30px rgba(236, 72, 153, 0.3);
//         }

//         /* Text shimmer effect */
//         @keyframes shimmer {
//           0% { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }

//         .text-shimmer {
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
//           background-size: 200% 100%;
//           animation: shimmer 3s infinite;
//           -webkit-background-clip: text;
//           background-clip: text;
//         }
//       `}</style>
//         </div>
//     );
// };

// export default GrowezaLanding;


import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Menu,
    X,
    ArrowRight,
    Play,
    Users,
    CreditCard,
    FileText,
    Calendar,
    Bell,
    Check,
    Star,
    Sparkles,
    Zap,
    Globe,
    Shield,
    TrendingUp,
    Brain,
    Rocket,
    Eye,
    Heart,
    Receipt,
    Briefcase,
    MessageCircle,
    Clock,
    Cpu,
    Timer,
    Repeat,
    ShieldCheck,
    Linkedin,
    Instagram
} from 'lucide-react';
import {useNavigate} from "react-router-dom"

const GrowezaLanding = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState({});
    const heroRef = useRef(null);
    const canvasRef = useRef(null);
    const dashboardref = useRef(null);
    const navigate = useNavigate();

    // Advanced scroll and mouse tracking
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting
                    }));
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Particle system canvas for light theme
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 300;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 0.5;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.color = ['rgba(139, 92, 246, ', 'rgba(59, 130, 246, ', 'rgba(16, 185, 129, '][Math.floor(Math.random() * 3)];
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
                ctx.fillStyle = `${this.color}${this.opacity})`;
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

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    // 3D transform based on mouse position
    const getTransform = (intensity = 1) => {
        const x = (mousePosition.x - window.innerWidth / 2) / 50 * intensity;
        const y = (mousePosition.y - window.innerHeight / 2) / 50 * intensity;
        return `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    };

    const navItems = ['Home', 'Features', 'Pricing', 'Testimonials', 'Contact'];
    const socials = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            link: "https://www.linkedin.com/in/your-profile", // replace with your link
        },
        {
            name: "X",
            icon: X,
            link: "https://x.com/your-handle", // replace with your link
        },
        {
            name: "Instagram",
            icon: Instagram,
            link: "https://instagram.com/your-handle", // replace with your link
        },
    ];
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 overflow-hidden relative">
            {/* Particle Canvas Background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-0 opacity-60"
                style={{ mixBlendMode: 'multiply' }}
            />

            {/* Light gradient overlays */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-100/30 via-transparent to-blue-100/30" />
                <div className="absolute inset-0 bg-gradient-to-tl from-purple-50/40 via-transparent to-cyan-50/40" />
            </div>

            {/* Navigation */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50
                        ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-lg'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer">
                                Groweza
                            </h1>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-8">
                                {navItems.map((item, index) => (
                                    <button
                                        key={item}
                                        onClick={() => scrollToSection(item.toLowerCase())}
                                        className="relative text-lg text-slate-600 hover:text-violet-600 transition-all duration-300 group font-medium cursor-pointer"
                                    >
                                        {item}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button className="text-slate-600 hover:text-violet-600 transition-all duration-300 font-medium cursor-pointer"
                                onClick={() => navigate('/login')}>
                                Login
                            </button>
                            <button className="relative group bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-violet-500/25 cursor-pointer"
                                onClick={() => navigate('/signup')}>
                                <span className="relative z-10">Sign Up</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-slate-600 hover:text-violet-600 transition-colors p-2"
                            >
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                                {/* Mobile Menu Panel */}
                                {isMenuOpen && (
                                    <div className="md:hidden absolute top-16 left-0 w-full bg-white/90 backdrop-blur-xl shadow-lg border-t border-slate-200 z-50 animate-slideDown">
                                        <div className="flex flex-col px-6 py-4 space-y-4">
                                            {navItems.map((item) => (
                                                <button
                                                    key={item}
                                                    onClick={() => {
                                                        scrollToSection(item.toLowerCase());
                                                        setIsMenuOpen(false); // close after click
                                                    }}
                                                    className="text-lg text-slate-700 hover:text-violet-600 font-medium transition-colors duration-300 text-left"
                                                >
                                                    {item}
                                                </button>
                                            ))}

                                            <div className="pt-4 border-t border-slate-200 flex flex-col space-y-3">
                                                <button
                                                    className="text-slate-600 hover:text-violet-600 transition-colors font-medium text-left"
                                                    onClick={() => {
                                                        navigate("/login");
                                                        setIsMenuOpen(false);
                                                    }}
                                                >
                                                    Login
                                                </button>
                                                <button
                                                    className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300 text-center"
                                                    onClick={() => {
                                                        navigate("/signup");
                                                        setIsMenuOpen(false);
                                                    }}
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="text-center max-w-5xl mx-auto">
                        {/* Floating icons around hero */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[Brain, Rocket, Zap, Globe, Shield, TrendingUp].map((Icon, i) => (
                                <Icon
                                    key={i}
                                    className="absolute text-violet-400/30"
                                    size={32}
                                    style={{
                                        left: `${20 + i * 15}%`,
                                        top: `${30 + (i % 3) * 20}%`,
                                        transform: `${getTransform(0.3)} translateZ(${i * 10}px)`,
                                        animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                                        animationDelay: `${i * 0.2}s`
                                    }}
                                />
                            ))}
                        </div>

                        <div className="space-y-8 relative">
                            {/* Animated badge */}
                            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 border border-violet-200">
                                <Sparkles className="mr-2 text-violet-600" size={16} />
                                <span className="text-sm font-medium text-violet-700">
                                    AI-Powered Freelance Revolution
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight text-slate-800">
                                <span className="block mb-4">
                                    Run Your Freelance Business
                                </span>
                                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Without the Chaos
                                </span>
                            </h1>

                            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
                                <p>
                                    Stop juggling spreadsheets, endless emails, and multiple apps.
                                </p>
                                <p>
                                    <span className="text-transparent bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text font-semibold">Groweza's AI</span> manages clients, sends proposals, schedules meetings, and processes payments — all from one beautiful, intelligent dashboard.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                                <button className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white px-12 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/25 cursor-pointer"
                                    onClick={() => navigate('/login')}
                                >
                                    <span className="relative z-10 flex items-center">
                                        Get Started
                                        <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-violet-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>

                                <button
                                    onClick={() => scrollToSection('features')}
                                    className="group flex items-center space-x-3 text-slate-600 hover:text-violet-600 transition-all duration-300 px-8 py-4 rounded-full border-2 border-slate-200 hover:border-violet-300 hover:bg-violet-50 cursor-pointer"
                                >
                                    <div className="p-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 group-hover:scale-110 transition-transform duration-300">
                                        <Play size={16} fill="white" />
                                    </div>
                                    <span className="font-semibold">See How It Works</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 3D Dashboard Preview */}
                    <div ref={dashboardref} className="mt-20 relative max-w-6xl mx-auto">
                        <div
                            className="relative group"
                            style={{ transform: getTransform(0.5) }}
                        >
                            {/* Glowing background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-200/30 via-purple-200/30 to-blue-200/30 rounded-3xl blur-3xl scale-110 group-hover:scale-125 transition-transform duration-700" />

                            {/* Main dashboard */}
                            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 shadow-2xl group-hover:border-violet-300 transition-all duration-500 group-hover:shadow-violet-500/10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                                            <Brain className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800">Groweza Dashboard</h3>
                                            <p className="text-slate-500">Everything automated, beautifully</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse" />
                                        <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                </div>

                                {/* Animated cards matching the image theme */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { icon: Users, label: "Total Clients", value: "4", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50", textColor: "text-blue-600" },
                                        { icon: Receipt, label: "Unpaid Invoices", value: "3", color: "from-red-500 to-red-600", bgColor: "bg-red-50", textColor: "text-red-600" },
                                        { icon: FileText, label: "Pending Proposals", value: "0", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50", textColor: "text-purple-600" },
                                        { icon: Calendar, label: "Upcoming Meetings", value: "0", color: "from-green-500 to-green-600", bgColor: "bg-green-50", textColor: "text-green-600" },
                                        { icon: Star, label: "Proposal Credits", value: "0/16", color: "from-yellow-500 to-orange-500", bgColor: "bg-yellow-50", textColor: "text-yellow-600" },
                                        { icon: Check, label: "Completed Projects", value: "0", color: "from-indigo-500 to-indigo-600", bgColor: "bg-indigo-50", textColor: "text-indigo-600" },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className={`relative group/card bg-white rounded-2xl p-6 border border-slate-100 hover:border-violet-200 transition-all duration-500 hover:scale-105 shadow-sm hover:shadow-lg`}
                                            style={{
                                                animation: `slideUp ${0.8 + index * 0.2}s ease-out`,
                                                animationDelay: `${index * 0.3}s`,
                                                animationFillMode: 'backwards'
                                            }}
                                        >
                                            <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform duration-300`}>
                                                <item.icon className={item.textColor} size={20} />
                                            </div>
                                            <h4 className="text-slate-600 font-medium mb-2 text-sm">{item.label}</h4>
                                            <p className="text-3xl font-bold text-slate-800">
                                                {item.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Revenue section like in the image */}
                                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h4 className="text-slate-800 font-semibold mb-1">Monthly Revenue</h4>
                                                <p className="text-slate-500 text-sm">Track your income over time</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-violet-600">$0</div>
                                                <div className="text-sm text-slate-400">Total Revenue</div>
                                            </div>
                                        </div>
                                        <div className="h-32 flex items-center justify-center text-slate-400">
                                            <div className="text-center">
                                                <TrendingUp size={48} className="mx-auto mb-2 opacity-30" />
                                                <p className="text-sm">No paid invoices yet.</p>
                                                <p className="text-xs">Start creating invoices to see your revenue!</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h4 className="text-slate-800 font-semibold mb-1">Project Status</h4>
                                                <p className="text-slate-500 text-sm">Current project breakdown</p>
                                            </div>
                                        </div>
                                        <div className="h-32 flex items-center justify-center">
                                            <div className="relative w-24 h-24">
                                                <svg className="w-24 h-24 transform -rotate-90">
                                                    <circle cx="48" cy="48" r="40" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                                                    <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="8" fill="none"
                                                        strokeDasharray={`${60} ${251 - 60}`} strokeLinecap="round" />
                                                    <circle cx="48" cy="48" r="40" stroke="#f59e0b" strokeWidth="8" fill="none"
                                                        strokeDasharray={`${30} ${251 - 30}`} strokeDashoffset={-60} strokeLinecap="round" />
                                                    <circle cx="48" cy="48" r="40" stroke="#ef4444" strokeWidth="8" fill="none"
                                                        strokeDasharray={`${20} ${251 - 20}`} strokeDashoffset={-90} strokeLinecap="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pain Points Section */}
            <section
                id="pain-points"
                className="py-32 relative bg-slate-50"
                data-animate
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-red-50 border border-red-200 mb-8">
                            <span className="text-sm font-medium text-red-600">The Problem</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6">
                            Why Freelancers <span className="text-transparent bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text">Burn Out</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            We analyzed the workflows of 10,000+ freelancers. The pain points are universal:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Tool Chaos",
                                description: "Switching between 7+ apps daily. Your brain isn't a task switcher.",
                                icon: "🔄",
                                bgColor: "bg-red-50",
                                borderColor: "border-red-200",
                                textColor: "text-red-600"
                            },
                            {
                                title: "Payment Hell",
                                description: "Chasing clients for money you've already earned. Awkward. Exhausting.",
                                icon: "💸",
                                bgColor: "bg-orange-50",
                                borderColor: "border-orange-200",
                                textColor: "text-orange-600"
                            },
                            {
                                title: "Lost Money",
                                description: "Every missed follow-up is $500-2000 walking out the door.",
                                icon: "📉",
                                bgColor: "bg-yellow-50",
                                borderColor: "border-yellow-200",
                                textColor: "text-yellow-600"
                            },
                            {
                                title: "Time Vampire",
                                description: "Admin tasks steal 25+ hours/week. That's $2500+ in lost billable time.",
                                icon: "⏰",
                                bgColor: "bg-purple-50",
                                borderColor: "border-purple-200",
                                textColor: "text-purple-600"
                            }
                        ].map((pain, index) => (
                            <div
                                key={index}
                                className={`group relative ${pain.bgColor} backdrop-blur-xl rounded-3xl p-8 border ${pain.borderColor} hover:scale-105 transition-all duration-500 hover:shadow-lg`}
                                style={{
                                    transform: isVisible['pain-points'] ? 'translateY(0)' : 'translateY(50px)',
                                    opacity: isVisible['pain-points'] ? 1 : 0,
                                    transitionDelay: `${index * 0.2}s`
                                }}
                            >
                                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {pain.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-800">{pain.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{pain.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution Overview */}
            {/* <section
                id="features"
                className="py-32 relative bg-white"
                data-animate
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-50 border border-green-200 mb-8">
                            <Sparkles className="mr-2 text-green-600" size={16} />
                            <span className="text-sm font-medium text-green-600">The Solution</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6">
                            One Dashboard. <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text">Zero Headaches.</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                            From first contact to final payment, Groweza's AI handles everything — so you can focus on what actually makes money.
                        </p>
                    </div>

                    <div className="space-y-20">
                        {[
                            {
                                icon: Brain,
                                title: "AI Client Management",
                                description: "Our AI learns your clients' patterns, predicts their needs, and automates relationship management. Never lose a deal to poor follow-up again.",
                                features: ["Smart contact scoring", "Automated relationship tracking", "Predictive insights"],
                                color: "from-purple-500 to-violet-500",
                                bgColor: "bg-purple-50",
                                textColor: "text-purple-600",
                                side: "left"
                            },
                            {
                                icon: Zap,
                                title: "Lightning Invoicing",
                                description: "Create branded invoices in 3 seconds, not 30 minutes. AI suggests optimal pricing based on market rates and client history.",
                                features: ["Instant invoice generation", "Smart pricing recommendations", "One-click payments"],
                                color: "from-blue-500 to-cyan-500",
                                bgColor: "bg-blue-50",
                                textColor: "text-blue-600",
                                side: "right"
                            },
                            {
                                icon: FileText,
                                title: "AI Proposal Engine",
                                description: "Generate winning proposals that close deals. Our AI analyzes 100,000+ successful proposals to craft yours.",
                                features: ["AI-powered writing", "Win rate optimization", "Template learning"],
                                color: "from-green-500 to-emerald-500",
                                bgColor: "bg-green-50",
                                textColor: "text-green-600",
                                side: "left"
                            },
                            {
                                icon: Calendar,
                                title: "Smart Scheduling",
                                description: "AI finds the perfect meeting times, handles reschedules, and even prep briefs. Your calendar becomes your assistant.",
                                features: ["Intelligent availability", "Auto conflict resolution", "Meeting preparation"],
                                color: "from-indigo-500 to-purple-500",
                                bgColor: "bg-indigo-50",
                                textColor: "text-indigo-600",
                                side: "right"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className={`flex items-center ${feature.side === 'right' ? 'flex-row-reverse' : ''}`}
                                style={{
                                    transform: isVisible['features'] ? 'translateX(0)' : `translateX(${feature.side === 'right' ? '100px' : '-100px'})`,
                                    opacity: isVisible['features'] ? 1 : 0,
                                    transitionDelay: `${index * 0.3}s`,
                                    transition: 'all 0.8s ease-out'
                                }}
                            >
                                <div className={`flex-1 ${feature.side === 'right' ? 'pl-12' : 'pr-12'}`}>
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center shadow-sm`}>
                                                <feature.icon className={feature.textColor} size={32} />
                                            </div>
                                            <h3 className="text-3xl font-bold text-slate-800">{feature.title}</h3>
                                        </div>

                                        <p className="text-xl text-slate-600 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        <div className="space-y-3">
                                            {feature.features.map((feat, i) => (
                                                <div key={i} className="flex items-center space-x-3">
                                                    <div className={`w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
                                                        <Check className="text-white" size={14} />
                                                    </div>
                                                    <span className="text-slate-600">{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="relative group" style={{ transform: getTransform(0.2) }}>
                                        <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 rounded-3xl blur-3xl group-hover:opacity-20 transition-opacity duration-700`} />
                                        <div className={`relative ${feature.bgColor} backdrop-blur-xl rounded-3xl p-8 border ${feature.bgColor.replace('bg-', 'border-').replace('-50', '-200')} group-hover:border-violet-300 transition-all duration-500 shadow-sm group-hover:shadow-lg`}>
                                            <div className="aspect-video rounded-2xl overflow-hidden bg-white/50 flex items-center justify-center">
                                                <feature.icon className={`${feature.textColor} opacity-20`} size={80} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            <section
                id="features"
                className="py-32 relative bg-white"
                data-animate
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-50 border border-green-200 mb-8">
                            <Sparkles className="mr-2 text-green-600" size={16} />
                            <span className="text-sm font-medium text-green-600">The Solution</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6">
                            One Dashboard.{" "}
                            <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text">
                                Zero Headaches.
                            </span>
                        </h2>
                        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl sm:max-w-4xl mx-auto">
                            From first contact to final payment, Groweza's AI handles everything —
                            so you can focus on what actually makes money.
                        </p>
                    </div>

                    <div className="space-y-20">
                        {[
                            {
                                icon: Brain,
                                title: "AI Client Management",
                                description:
                                    "Our AI learns your clients' patterns, predicts their needs, and automates relationship management. Never lose a deal to poor follow-up again.",
                                features: [
                                    "Smart contact scoring",
                                    "Automated relationship tracking",
                                    "Predictive insights",
                                ],
                                color: "from-purple-500 to-violet-500",
                                bgColor: "bg-purple-50",
                                textColor: "text-purple-600",
                                side: "left",
                            },
                            {
                                icon: Zap,
                                title: "Lightning Invoicing",
                                description:
                                    "Create branded invoices in 3 seconds, not 30 minutes. AI suggests optimal pricing based on market rates and client history.",
                                features: [
                                    "Instant invoice generation",
                                    "Smart pricing recommendations",
                                    "One-click payments",
                                ],
                                color: "from-blue-500 to-cyan-500",
                                bgColor: "bg-blue-50",
                                textColor: "text-blue-600",
                                side: "right",
                            },
                            {
                                icon: FileText,
                                title: "AI Proposal Engine",
                                description:
                                    "Generate winning proposals that close deals. Our AI analyzes 100,000+ successful proposals to craft yours.",
                                features: ["AI-powered writing", "Win rate optimization", "Template learning"],
                                color: "from-green-500 to-emerald-500",
                                bgColor: "bg-green-50",
                                textColor: "text-green-600",
                                side: "left",
                            },
                            {
                                icon: Calendar,
                                title: "Smart Scheduling",
                                description:
                                    "AI finds the perfect meeting times, handles reschedules, and even prep briefs. Your calendar becomes your assistant.",
                                features: [
                                    "Intelligent availability",
                                    "Auto conflict resolution",
                                    "Meeting preparation",
                                ],
                                color: "from-indigo-500 to-purple-500",
                                bgColor: "bg-indigo-50",
                                textColor: "text-indigo-600",
                                side: "right",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row ${feature.side === "right" ? "md:flex-row-reverse" : ""
                                    } items-center gap-10`}
                                style={{
                                    transform: isVisible["features"]
                                        ? "translateX(0)"
                                        : `translateX(${feature.side === "right" ? "100px" : "-100px"})`,
                                    opacity: isVisible["features"] ? 1 : 0,
                                    transitionDelay: `${index * 0.3}s`,
                                    transition: "all 0.8s ease-out",
                                }}
                            >
                                {/* Text Section */}
                                <div className={`flex-1 ${feature.side === "right" ? "md:pl-12" : "md:pr-12"}`}>
                                    <div className="space-y-6 text-center md:text-left">
                                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                            <div
                                                className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center shadow-sm`}
                                            >
                                                <feature.icon className={feature.textColor} size={32} />
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
                                                {feature.title}
                                            </h3>
                                        </div>

                                        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        <div className="space-y-3">
                                            {feature.features.map((feat, i) => (
                                                <div key={i} className="flex items-center space-x-3">
                                                    <div
                                                        className={`w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}
                                                    >
                                                        <Check className="text-white" size={14} />
                                                    </div>
                                                    <span className="text-slate-600">{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Illustration Section */}
                                <div className="flex-1 w-full md:w-auto">
                                    <div className="relative group" style={{ transform: getTransform(0.2) }}>
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 rounded-3xl blur-3xl group-hover:opacity-20 transition-opacity duration-700`}
                                        />
                                        <div
                                            className={`relative ${feature.bgColor} backdrop-blur-xl rounded-3xl p-8 border ${feature.bgColor
                                                .replace("bg-", "border-")
                                                .replace("-50", "-200")} group-hover:border-violet-300 transition-all duration-500 shadow-sm group-hover:shadow-lg`}
                                        >
                                            <div className="aspect-video rounded-2xl overflow-hidden bg-white/50 flex items-center justify-center">
                                                <feature.icon className={`${feature.textColor} opacity-20`} size={80} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Pricing Section */}
            <section
                id="pricing"
                className="py-32 relative bg-slate-50"
                data-animate
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-50 border border-green-200 mb-8">
                            <span className="text-sm font-medium text-green-600">Transparent Pricing</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6">
                            Pricing That <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text">Actually Makes Sense</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Built for real freelancers, not enterprise bureaucracy. Pay less than your coffee budget to 10x your business.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Basic Plan */}
                        <div
                            className="group relative bg-white backdrop-blur-xl rounded-3xl p-10 border border-slate-200 hover:border-violet-300 transition-all duration-500 hover:scale-105 shadow-sm hover:shadow-lg"
                            style={{
                                transform: isVisible['pricing'] ? 'translateY(0)' : 'translateY(50px)',
                                opacity: isVisible['pricing'] ? 1 : 0,
                                transitionDelay: '0.2s'
                            }}
                        >
                            <div className="relative z-10">
                                <div className="text-center mb-10">
                                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
                                        <span className="text-sm font-medium text-slate-600">Getting Started</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-800 mb-4">Basic Plan</h3>
                                    <div className="flex items-baseline justify-center">
                                        <span className="text-6xl font-black text-slate-800">$11</span>
                                        <span className="text-2xl text-slate-500 ml-2">/month</span>
                                    </div>
                                    <p className="text-slate-500 mt-4">Perfect for growing freelancers who need the essentials</p>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {[
                                        "15 Clients",
                                        "20 Invoices/month",
                                        "16 Proposals/month",
                                        "3 AI-scheduled meetings/month",
                                        "Basic automation templates",
                                        "Email support"
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-center space-x-4">
                                            <div className="w-6 h-6 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check className="text-white" size={16} />
                                            </div>
                                            <span className="text-slate-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-4 rounded-2xl font-bold text-lg hover:from-slate-500 hover:to-slate-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                    Start Basic Plan
                                </button>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div
                            className="group relative bg-gradient-to-br from-violet-50 to-purple-50 backdrop-blur-xl rounded-3xl p-10 border-2 border-violet-200 hover:border-violet-300 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-violet-500/10"
                            style={{
                                transform: isVisible['pricing'] ? 'translateY(0)' : 'translateY(50px)',
                                opacity: isVisible['pricing'] ? 1 : 0,
                                transitionDelay: '0.4s'
                            }}
                        >
                            {/* Popular badge */}
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg">
                                    ⚡ MOST POPULAR
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="text-center mb-10">
                                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 border border-violet-200 mb-6">
                                        <Sparkles className="mr-2 text-violet-600" size={16} />
                                        <span className="text-sm font-medium text-violet-700">AI-Powered</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-800 mb-4">Premium Plan</h3>
                                    <div className="flex items-baseline justify-center">
                                        <span className="text-6xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">$21</span>
                                        <span className="text-2xl text-slate-500 ml-2">/month</span>
                                    </div>
                                    <p className="text-slate-600 mt-4">For professionals ready to dominate their market</p>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Unlimited Clients & Invoices",
                                        "Unlimited AI-generated proposals",
                                        "Unlimited smart meetings",
                                        "Advanced AI automation",
                                        "Custom domain portfolio",
                                        "Priority support + AI chat"
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-center space-x-4">
                                            <div className="w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check className="text-white" size={16} />
                                            </div>
                                            <span className="text-slate-700 font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-violet-500 hover:via-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-violet-500/25 relative overflow-hidden group/btn">
                                    <span className="relative z-10">Start Premium Plan</span>
                                    <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <button className="group inline-flex items-center text-violet-600 hover:text-violet-700 font-semibold text-lg transition-all duration-300">
                            <span>Compare All Features</span>
                            <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={20} />
                        </button>
                    </div>

                    {/* ROI Calculator */}
                    <div className="mt-20 max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 backdrop-blur-xl rounded-3xl p-8 border border-green-200">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-800 mb-4">💰 ROI Calculator</h3>
                                <p className="text-slate-600">See how much Groweza saves you:</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 text-center">
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-green-600">25hrs</div>
                                    <div className="text-sm text-slate-500">Saved per week</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-green-600">$2,500</div>
                                    <div className="text-sm text-slate-500">Extra monthly revenue</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-green-600">11,900%</div>
                                    <div className="text-sm text-slate-500">ROI (vs $21/month)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section
                id="testimonials"
                className="py-32 relative bg-white"
                data-animate
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-50 border border-yellow-200 mb-8">
                            <Star className="mr-2 text-yellow-600" size={16} />
                            <span className="text-sm font-medium text-yellow-700">Social Proof</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6">
                            Freelancers Are <span className="text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text">Obsessed</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Join 50,000+ freelancers who've transformed their business with Groweza
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "I went from struggling to book 2 clients to managing 15+ simultaneously. Groweza's AI literally runs my business while I focus on design. Revenue up 340% in 6 months.",
                                author: "Priya K.",
                                role: "UX Designer",
                                avatar: "P",
                                color: "from-purple-500 to-violet-500",
                                bgColor: "bg-purple-50",
                                textColor: "text-purple-600",
                                metrics: { revenue: "+340%", clients: "15 active" }
                            },
                            {
                                quote: "The AI proposal feature is pure magic. It writes better proposals than I ever could, and my close rate went from 20% to 80%. I'm not exaggerating.",
                                author: "Mark R.",
                                role: "Web Developer",
                                avatar: "M",
                                color: "from-blue-500 to-cyan-500",
                                bgColor: "bg-blue-50",
                                textColor: "text-blue-600",
                                metrics: { closeRate: "80%", proposals: "50+ monthly" }
                            },
                            {
                                quote: "My clients think I have a full team now. The automated follow-ups and smart scheduling make me look like a Fortune 500 company. Best investment ever.",
                                author: "Sara M.",
                                role: "Marketing Consultant",
                                avatar: "S",
                                color: "from-green-500 to-emerald-500",
                                bgColor: "bg-green-50",
                                textColor: "text-green-600",
                                metrics: { clients: "23 active", referrals: "+60%" }
                            }
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="group relative bg-white backdrop-blur-xl rounded-3xl p-8 border border-slate-100 hover:border-violet-200 transition-all duration-500 hover:scale-105 shadow-sm hover:shadow-lg"
                                style={{
                                    transform: isVisible['testimonials'] ? 'translateY(0)' : 'translateY(50px)',
                                    opacity: isVisible['testimonials'] ? 1 : 0,
                                    transitionDelay: `${index * 0.2}s`
                                }}
                            >
                                <div className="relative z-10">
                                    {/* Stars */}
                                    <div className="flex text-yellow-500 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={20}
                                                fill="currentColor"
                                                className="animate-pulse"
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="text-lg text-slate-600 mb-8 italic leading-relaxed">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    {/* Metrics */}
                                    <div className={`grid grid-cols-3 gap-4 mb-8 p-4 ${testimonial.bgColor} rounded-2xl border ${testimonial.bgColor.replace('bg-', 'border-').replace('-50', '-100')}`}>
                                        {Object.entries(testimonial.metrics).map(([key, value], i) => (
                                            <div key={i} className="text-center">
                                                <div className={`text-lg font-bold ${testimonial.textColor}`}>
                                                    {value}
                                                </div>
                                                <div className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-16 h-16 ${testimonial.bgColor} rounded-2xl flex items-center justify-center ${testimonial.textColor} font-bold text-xl shadow-sm border ${testimonial.bgColor.replace('bg-', 'border-').replace('-50', '-200')}`}>
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 text-lg">{testimonial.author}</div>
                                            <div className="text-slate-500">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust badges */}
                    <div className="mt-20 text-center">
                        <div className="inline-flex items-center space-x-8 p-6 bg-slate-50 backdrop-blur-xl rounded-2xl border border-slate-200">
                            <div className="flex items-center space-x-2">
                                <Shield className="text-green-500" size={24} />
                                <span className="text-slate-700 font-semibold">SOC 2 Certified</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Eye className="text-blue-500" size={24} />
                                <span className="text-slate-700 font-semibold">GDPR Compliant</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Heart className="text-red-500" size={24} />
                                <span className="text-slate-700 font-semibold">99.9% Uptime</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative bg-gradient-to-br from-violet-50 to-purple-100">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-200/30 via-purple-200/30 to-blue-200/30 blur-3xl" />
                </div>

                <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="space-y-8">
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 border border-violet-200 backdrop-blur-sm">
                            <Rocket className="mr-2 text-violet-600" size={16} />
                            <span className="text-sm font-medium text-violet-700">Transform Your Business</span>
                        </div>

                        <h2 className="text-4xl sm:text-6xl font-black text-slate-800 leading-tight">
                            Stop Managing. <br />
                            Start <span className="text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text">Dominating.</span>
                        </h2>

                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Join the AI revolution. Let Groweza handle the boring stuff while you focus on what you love: creating amazing work and making serious money.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                            <button className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white px-12 py-6 rounded-full font-bold text-xl overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/25 cursor-pointer"
                            onClick={()=>navigate("/login")}>
                                <span className="relative z-10 flex items-center">
                                    Start Your Transformation
                                    <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform duration-300" size={24} />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                            </button>

                            <div className="text-center sm:text-left">
                                <div className="text-sm text-slate-500">Free 14-day trial • No credit card required</div>
                                <div className="text-sm text-slate-400">Cancel anytime • 30-day money-back guarantee</div>
                            </div>
                        </div>

                        {/* Live stats */}
                        <div className="pt-16">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                                {[
                                    { label: "Active Users", value: "50,247", icon: Users },
                                    { label: "Revenue Generated", value: "$127M+", icon: TrendingUp },
                                    { label: "Hours Saved", value: "2.1M+", icon: Zap },
                                    { label: "Client Satisfaction", value: "98.7%", icon: Heart }
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <stat.icon className="mx-auto mb-3 text-violet-500" size={32} />
                                        <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                                        <div className="text-sm text-slate-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="relative bg-gradient-to-br from-slate-100 to-slate-200 py-20 border-t border-slate-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-5 gap-12">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <h3 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                Groweza
                            </h3>
                            <p className="text-slate-600 mb-6 max-w-md">
                                The AI-powered platform that transforms freelancers into business powerhouses. Join the revolution.
                            </p>
                            <div className="flex space-x-4">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 hover:text-violet-700 hover:bg-violet-200 transition-all duration-300"
                                        aria-label={social.name}
                                    >
                                        <social.icon size={22} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        {[
                            {
                                title: "Product",
                                links: ["Features", "Pricing", "AI Dashboard", "Integrations", "API"]
                            },
                            {
                                title: "Resources",
                                links: ["Blog", "Case Studies", "Templates", "Community", "Academy"]
                            },
                            {
                                title: "Support",
                                links: ["Help Center", "Contact", "Status", "Privacy", "Terms"]
                            }
                        ].map((section) => (
                            <div key={section.title}>
                                <h4 className="font-bold text-slate-800 mb-6">{section.title}</h4>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-slate-600 hover:text-violet-600 transition-colors duration-300">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-300 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-slate-600 text-sm">
                            © 2025 Groweza. All rights reserved. Built with 🤖 AI and ❤️ for freelancers.
                        </p>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <span className="text-xs text-slate-500">Powered by</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs text-slate-500">AI Engine v2.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Custom CSS for advanced animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          25% { transform: translateY(-10px) rotateZ(1deg); }
          50% { transform: translateY(-5px) rotateZ(0deg); }
          75% { transform: translateY(-15px) rotateZ(-1deg); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(248, 250, 252);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #8b5cf6, #a855f7);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #7c3aed, #9333ea);
        }
      `}</style>
        </div>
    );
};

export default GrowezaLanding;












// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//     Menu,
//     X,
//     ArrowRight,
//     Play,
//     Users,
//     CreditCard,
//     FileText,
//     Calendar,
//     Bell,
//     Check,
//     Star,
//     Sparkles,
//     Zap,
//     Globe,
//     Shield,
//     TrendingUp,
//     Brain,
//     Rocket,
//     Eye,
//     Heart,
//     Receipt,
//     Briefcase,
//     MessageCircle,
//     Clock,
//     Cpu,
//     Timer,
//     Repeat,
//     ShieldCheck
// } from 'lucide-react';
// import { motion, useScroll, useTransform } from "framer-motion";
// import BlurText from './react-bits/BlurText';
// import TextType from './react-bits/TypeText';
// import GradientText from './react-bits/GradientText';
// import ShinyText from './react-bits/ShineyText';
// import SpotlightCard from './react-bits/SpotLightCard';
// import { useNavigate } from 'react-router-dom';

// const GrowezaLanding = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [scrollY, setScrollY] = useState(0);
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//     const [isVisible, setIsVisible] = useState({});
//     const heroRef = useRef(null);
//     const canvasRef = useRef(null);
//     const navigate = useNavigate();
//     const dashboardref = useRef(null);


//     // Advanced scroll and mouse tracking
//     useEffect(() => {
//         const handleScroll = () => setScrollY(window.scrollY);
//         const handleMouseMove = (e) => {
//             setMousePosition({ x: e.clientX, y: e.clientY });
//         };

//         window.addEventListener('scroll', handleScroll);
//         window.addEventListener('mousemove', handleMouseMove);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//             window.removeEventListener('mousemove', handleMouseMove);
//         };
//     }, []);

//     // Intersection Observer for scroll animations
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     setIsVisible(prev => ({
//                         ...prev,
//                         [entry.target.id]: entry.isIntersecting
//                     }));
//                 });
//             },
//             { threshold: 0.1 }
//         );

//         document.querySelectorAll('[data-animate]').forEach((el) => {
//             observer.observe(el);
//         });

//         return () => observer.disconnect();
//     }, []);

//     // Particle system canvas
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         const particles = [];
//         const particleCount = 50;

//         class Particle {
//             constructor() {
//                 this.x = Math.random() * canvas.width;
//                 this.y = Math.random() * canvas.height;
//                 this.vx = (Math.random() - 0.5) * 0.5;
//                 this.vy = (Math.random() - 0.5) * 0.5;
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
//                 ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
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

//             // Connect nearby particles
//             particles.forEach((a, i) => {
//                 particles.slice(i + 1).forEach(b => {
//                     const dx = a.x - b.x;
//                     const dy = a.y - b.y;
//                     const distance = Math.sqrt(dx * dx + dy * dy);

//                     if (distance < 100) {
//                         ctx.beginPath();
//                         ctx.moveTo(a.x, a.y);
//                         ctx.lineTo(b.x, b.y);
//                         ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
//                         ctx.lineWidth = 0.5;
//                         ctx.stroke();
//                     }
//                 });
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

//     const scrollToSection = (sectionId) => {
//         document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
//         setIsMenuOpen(false);
//     };

//     // 3D transform based on mouse position
//     const getTransform = (intensity = 1) => {
//         const x = (mousePosition.x - window.innerWidth / 2) / 50 * intensity;
//         const y = (mousePosition.y - window.innerHeight / 2) / 50 * intensity;
//         return `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
//     };

//     const navItems = ['Home', 'Features', 'Pricing', 'Testimonials', 'Contact'];

//     const containerVariants = {
//         hidden: {},
//         visible: {
//             transition: {
//                 staggerChildren: 0.15 // delay between each item
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: -20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
//     };


//     const { scrollYProgress } = useScroll({
//         target: dashboardref,
//         offset: ["start end", "center center"] // triggers when section enters
//     });

//     // Map scroll progress to rotationX (from -75° to 0°)
//     const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
//     const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]); // optional fade-in


// return (

// <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 overflow-hidden relative">
//     {/* Particle Canvas Background */}
//     <canvas
//         ref={canvasRef}
//         className="fixed inset-0 pointer-events-none z-0"
//         style={{ mixBlendMode: 'multiply' }}
//     />

//     {/* Navigation */}
//     <motion.nav
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50
//             ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-md'
//             : 'bg-transparent'
//             }`}
//     >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-20">
//                 {/* Logo */}
//                 <motion.div variants={itemVariants} className="flex-shrink-0">
//                     <h1
//                         className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
//                         onClick={() => navigate('/')}
//                     >
//                         Groweza
//                     </h1>
//                 </motion.div>

//                 {/* Desktop Menu */}
//                 <div className="hidden md:block">
//                     <div className="ml-10 flex items-center space-x-8">
//                         {navItems.map((item, index) => (
//                             <motion.button
//                                 key={item}
//                                 variants={itemVariants}
//                                 onClick={() => scrollToSection(item.toLowerCase())}
//                                 className="relative text-lg text-slate-600 hover:text-slate-900 transition-all duration-300 group font-medium cursor-pointer"
//                             >
//                                 <ShinyText text={item} disabled={false} speed={3} className='custom-class' />
//                                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full cursor-pointer" />
//                             </motion.button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Desktop Buttons */}
//                 <div className="hidden md:flex items-center space-x-4">
//                     <motion.button
//                         variants={itemVariants}
//                         className="text-slate-600 hover:text-slate-900 transition-all duration-300 font-medium cursor-pointer"
//                         onClick={() => navigate('/login')}
//                     >
//                         Login
//                     </motion.button>
//                     <motion.button
//                         variants={itemVariants}
//                         className="relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer shadow-md"
//                         onClick={() => navigate('/signup')}
//                     >
//                         <span className="relative z-10">Sign Up</span>
//                         <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     </motion.button>
//                 </div>

//                 {/* Mobile menu button */}
//                 <motion.div variants={itemVariants} className="md:hidden">
//                     <button
//                         onClick={() => setIsMenuOpen(!isMenuOpen)}
//                         className="text-slate-600 hover:text-slate-900 transition-colors p-2"
//                     >
//                         {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//                     </button>
//                 </motion.div>
//             </div>
//         </div>
//     </motion.nav>

//     {/* Hero Section */}
//     <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
//             <div className="text-center max-w-5xl mx-auto">
//                 <div className="space-y-8 relative">
//                     <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-100 border border-blue-200">
//                         <Sparkles className="mr-2 text-blue-600" size={16} />
//                         <span className="text-sm font-medium text-blue-700">
//                             <TextType
//                                 text={["AI-Powered Freelance Revolution"]}
//                                 typingSpeed={75}
//                                 pauseDuration={1500}
//                                 showCursor={true}
//                                 cursorCharacter="|"
//                             />
//                         </span>
//                     </div>

//                     <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
//                         <span className="block mb-4 text-slate-900">
//                             Run Your Freelance Business
//                         </span>
//                         <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                             Without the Chaos
//                         </span>
//                     </h1>

//                     <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
//                         <p>
//                             Stop juggling spreadsheets, endless emails, and multiple apps.
//                         </p>
//                         <p>
//                             <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold">Groweza's AI</span> manages clients, sends proposals, schedules meetings, and processes payments — all from one beautiful, intelligent dashboard.
//                         </p>
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
//                         <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer shadow-md"
//                             onClick={() => navigate('/login')}>
//                             <span className="relative z-10 flex items-center">
//                                 Start Free Trial
//                                 <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
//                             </span>
//                             <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         </button>

//                         <button
//                             onClick={() => scrollToSection('features')}
//                             className="group flex items-center space-x-3 text-slate-700 hover:text-slate-900 transition-all duration-300 px-8 py-4 rounded-full border border-slate-300 hover:border-purple-500 hover:bg-purple-50 cursor-pointer"
//                         >
//                             <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-110 transition-transform duration-300">
//                                 <Play size={16} fill="white" />
//                             </div>
//                             <span className="font-semibold">See How It Works</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* 3D Dashboard Preview */}
//             <motion.div
//                 ref={dashboardref}
//                 style={{
//                     rotateX,
//                     opacity,
//                     transformPerspective: 1000,
//                 }}
//             >
//                 <div className="mt-20 relative w-7xl mx-auto">
//                     <div
//                         className="relative group"
//                         style={{ transform: getTransform(0.5) }}
//                     >
//                         <div className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-xl group-hover:shadow-2xl transition-all duration-500">
//                             <div className="flex items-center justify-between mb-8">
//                                 <div className="flex items-center space-x-4">
//                                     <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
//                                         <Brain className="text-white" size={24} />
//                                     </div>
//                                     <div>
//                                         <h3 className="text-2xl font-bold text-slate-900">Groweza Dashboard</h3>
//                                         <p className="text-slate-500">Everything automated, beautifully</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex space-x-2">
//                                     <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse" />
//                                     <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
//                                     <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
//                                 </div>
//                             </div>

//                             {/* Animated cards */}
//                             <div className="grid md:grid-cols-3 gap-6">
//                                 {[
//                                     { icon: FileText, label: "AI Proposal Generated", value: "$2,400", color: "bg-green-100 text-green-800" },
//                                     { icon: Calendar, label: "Smart Meeting Booked", value: "Tomorrow 2PM", color: "bg-blue-100 text-blue-800" },
//                                     { icon: CreditCard, label: "Payment Processed", value: "$1,200", color: "bg-purple-100 text-purple-800" },
//                                     { icon: Users, label: "New Clients This Month", value: "+3", color: "bg-yellow-100 text-yellow-800" },
//                                     { icon: Receipt, label: "Pending Invoices", value: "$850", color: "bg-pink-100 text-pink-800" },
//                                     { icon: Briefcase, label: "Projects In Progress", value: "4 Active", color: "bg-indigo-100 text-indigo-800" },
//                                 ].map((item, index) => (
//                                     <div
//                                         key={index}
//                                         className="relative group/card bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md"
//                                         style={{
//                                             animation: `slideUp ${0.8 + index * 0.2}s ease-out`,
//                                             animationDelay: `${index * 0.3}s`,
//                                             animationFillMode: 'backwards'
//                                         }}
//                                     >
//                                         <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform duration-300`}>
//                                             <item.icon className="text-current" size={20} />
//                                         </div>
//                                         <h4 className="text-slate-800 font-semibold mb-2">{item.label}</h4>
//                                         <p className="text-2xl font-bold text-slate-900">
//                                             {item.value}
//                                         </p>
//                                         <div className="absolute top-4 right-4">
//                                             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Stats bar */}
//                             <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-100 rounded-2xl border border-slate-200">
//                                 {[
//                                     { label: "Revenue", value: "+127%", icon: TrendingUp },
//                                     { label: "Time Saved", value: "23hrs/week", icon: Zap },
//                                     { label: "Client Satisfaction", value: "98%", icon: Heart },
//                                     { label: "Tasks Automated", value: "320+", icon: Cpu },
//                                     { label: "Avg. Project Delivery", value: "2.3 days faster", icon: Timer },
//                                     { label: "Return Clients", value: "85%", icon: Repeat },
//                                     { label: "Error Reduction", value: "-72%", icon: ShieldCheck },
//                                     { label: "Growth in Leads", value: "+45%", icon: Users }
//                                 ].map((stat, i) => (
//                                     <div key={i} className="flex items-center space-x-2">
//                                         <stat.icon className="text-purple-500" size={16} />
//                                         <span className="text-slate-600 text-sm">{stat.label}:</span>
//                                         <span className="text-slate-900 font-bold">{stat.value}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     </section>

//     {/* Pain Points Section */}
//     <section
//         id="pain-points"
//         className="py-32 relative bg-white"
//         data-animate
//     >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//             <div className="text-center mb-20">
//                 <div className="inline-flex items-center px-6 py-2 rounded-full bg-red-100 border border-red-200 mb-8">
//                     <span className="text-sm font-medium text-red-700">The Problem</span>
//                 </div>
//                 <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
//                     Why Freelancers <span className="text-transparent bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text">Burn Out</span>
//                 </h2>
//                 <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//                     We analyzed the workflows of 10,000+ freelancers. The pain points are universal:
//                 </p>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {[
//                     {
//                         title: "Tool Chaos",
//                         description: "Switching between 7+ apps daily. Your brain isn't a task switcher.",
//                         icon: "🔄",
//                         gradient: "bg-red-50",
//                         border: "border-red-100"
//                     },
//                     {
//                         title: "Payment Hell",
//                         description: "Chasing clients for money you've already earned. Awkward. Exhausting.",
//                         icon: "💸",
//                         gradient: "bg-orange-50",
//                         border: "border-orange-100"
//                     },
//                     {
//                         title: "Lost Money",
//                         description: "Every missed follow-up is $500-2000 walking out the door.",
//                         icon: "📉",
//                         gradient: "bg-yellow-50",
//                         border: "border-yellow-100"
//                     },
//                     {
//                         title: "Time Vampire",
//                         description: "Admin tasks steal 25+ hours/week. That's $2500+ in lost billable time.",
//                         icon: "⏰",
//                         gradient: "bg-purple-50",
//                         border: "border-purple-100"
//                     }
//                 ].map((pain, index) => (
//                     <div
//                         key={index}
//                         className={`group relative ${pain.gradient} rounded-3xl p-8 border ${pain.border} hover:scale-105 transition-all duration-300 hover:shadow-lg`}
//                         style={{
//                             transform: isVisible['pain-points'] ? 'translateY(0)' : 'translateY(50px)',
//                             opacity: isVisible['pain-points'] ? 1 : 0,
//                             transitionDelay: `${index * 0.2}s`
//                         }}
//                     >
//                         <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
//                             {pain.icon}
//                         </div>
//                         <h3 className="text-2xl font-bold mb-4 text-slate-900">{pain.title}</h3>
//                         <p className="text-slate-600 leading-relaxed">{pain.description}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </section>

//     {/* Solution Overview */}
//     <section
//         id="features"
//         className="py-32 relative bg-slate-50"
//         data-animate
//     >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//             <div className="text-center mb-20">
//                 <div className="inline-flex items-center px-6 py-2 rounded-full bg-green-100 border border-green-200 mb-8">
//                     <Sparkles className="mr-2 text-green-600" size={16} />
//                     <span className="text-sm font-medium text-green-700">The Solution</span>
//                 </div>
//                 <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
//                     One Dashboard. <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text">Zero Headaches.</span>
//                 </h2>
//                 <p className="text-xl text-slate-600 max-w-4xl mx-auto">
//                     From first contact to final payment, Groweza's AI handles everything — so you can focus on what actually makes money.
//                 </p>
//             </div>

//             <div className="space-y-20">
//                 {[
//                     {
//                         icon: Brain,
//                         title: "AI Client Management",
//                         description: "Our AI learns your clients' patterns, predicts their needs, and automates relationship management. Never lose a deal to poor follow-up again.",
//                         features: ["Smart contact scoring", "Automated relationship tracking", "Predictive insights"],
//                         color: "from-purple-500 to-pink-500",
//                         side: "left",
//                         image: "/Client Management.jpeg"
//                     },
//                     {
//                         icon: Zap,
//                         title: "Lightning Invoicing",
//                         description: "Create branded invoices in 3 seconds, not 30 minutes. AI suggests optimal pricing based on market rates and client history.",
//                         features: ["Instant invoice generation", "Smart pricing recommendations", "One-click payments"],
//                         color: "from-blue-500 to-cyan-500",
//                         side: "right",
//                         image: "/invoice management.jpeg"
//                     },
//                     {
//                         icon: FileText,
//                         title: "AI Proposal Engine",
//                         description: "Generate winning proposals that close deals. Our AI analyzes 100,000+ successful proposals to craft yours.",
//                         features: ["AI-powered writing", "Win rate optimization", "Template learning"],
//                         color: "from-green-500 to-emerald-500",
//                         side: "left",
//                         image: "/Proposal Management.jpeg"
//                     },
//                     {
//                         icon: Calendar,
//                         title: "Smart Scheduling",
//                         description: "AI finds the perfect meeting times, handles reschedules, and even prep briefs. Your calendar becomes your assistant.",
//                         features: ["Intelligent availability", "Auto conflict resolution", "Meeting preparation"],
//                         color: "from-purple-500 to-black-500",
//                         side: "right",
//                         image: "/meeting scheduler.jpeg"
//                     }
//                 ].map((feature, index) => (
//                     <div
//                         key={index}
//                         className={`flex items-center ${feature.side === 'right' ? 'flex-row-reverse' : ''}`}
//                         style={{
//                             transform: isVisible['features'] ? 'translateX(0)' : `translateX(${feature.side === 'right' ? '100px' : '-100px'})`,
//                             opacity: isVisible['features'] ? 1 : 0,
//                             transitionDelay: `${index * 0.3}s`,
//                             transition: 'all 0.8s ease-out'
//                         }}
//                     >
//                         <div className={`flex-1 ${feature.side === 'right' ? 'pl-12' : 'pr-12'}`}>
//                             <div className="space-y-6">
//                                 <div className="flex items-center space-x-4">
//                                     <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
//                                         <feature.icon className="text-white" size={32} />
//                                     </div>
//                                     <h3 className="text-3xl font-bold text-slate-900">{feature.title}</h3>
//                                 </div>

//                                 <p className="text-xl text-slate-600 leading-relaxed">
//                                     {feature.description}
//                                 </p>

//                                 <div className="space-y-3">
//                                     {feature.features.map((feat, i) => (
//                                         <div key={i} className="flex items-center space-x-3">
//                                             <div className={`w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
//                                                 <Check className="text-white" size={14} />
//                                             </div>
//                                             <span className="text-slate-700">{feat}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="flex-1">
//                             <div className="relative group" style={{ transform: getTransform(0.2) }}>
//                                 <div className="relative bg-white rounded-3xl p-2 border border-slate-200 group-hover:border-purple-300 transition-all duration-300 shadow-md">
//                                     <div className="aspect-video rounded-2xl overflow-hidden">
//                                         <img
//                                             src={feature.image}
//                                             alt={feature.title}
//                                             className="w-full h-full object-cover"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </section>

//     {/* Pricing Section */}
//     <section
//         id="pricing"
//         className="py-32 relative bg-white"
//         data-animate
//     >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//             <div className="text-center mb-20">
//                 <div className="inline-flex items-center px-6 py-2 rounded-full bg-green-100 border border-green-200 mb-8">
//                     <span className="text-sm font-medium text-green-700">Transparent Pricing</span>
//                 </div>
//                 <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
//                     Pricing That <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text">Actually Makes Sense</span>
//                 </h2>
//                 <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//                     Built for real freelancers, not enterprise bureaucracy. Pay less than your coffee budget to 10x your business.
//                 </p>
//             </div>

//             <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
//                 {/* Basic Plan */}
//                 <div
//                     className="group relative bg-white rounded-3xl p-10 border border-slate-200 hover:border-purple-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
//                     style={{
//                         transform: isVisible['pricing'] ? 'translateY(0)' : 'translateY(50px)',
//                         opacity: isVisible['pricing'] ? 1 : 0,
//                         transitionDelay: '0.2s'
//                     }}
//                 >
//                     <div className="text-center mb-10">
//                         <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
//                             <span className="text-sm font-medium text-slate-700">Getting Started</span>
//                         </div>
//                         <h3 className="text-3xl font-bold text-slate-900 mb-4">Basic Plan</h3>
//                         <div className="flex items-baseline justify-center">
//                             <span className="text-6xl font-black text-slate-900">$11</span>
//                             <span className="text-2xl text-slate-600 ml-2">/month</span>
//                         </div>
//                         <p className="text-slate-600 mt-4">Perfect for growing freelancers who need the essentials</p>
//                     </div>

//                     <ul className="space-y-4 mb-10">
//                         {[
//                             "15 Clients",
//                             "20 Invoices/month",
//                             "16 Proposals/month",
//                             "3 AI-scheduled meetings/month",
//                             "Basic automation templates",
//                             "Email support"
//                         ].map((feature, index) => (
//                             <li key={index} className="flex items-center space-x-4">
//                                 <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
//                                     <Check className="text-slate-700" size={16} />
//                                 </div>
//                                 <span className="text-slate-700">{feature}</span>
//                             </li>
//                         ))}
//                     </ul>

//                     <button className="w-full bg-slate-100 text-slate-800 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all duration-300">
//                         Start Basic Plan
//                     </button>
//                 </div>

//                 {/* Premium Plan */}
//                 <div
//                     className="group relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-10 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-[1.02] shadow-lg"
//                     style={{
//                         transform: isVisible['pricing'] ? 'translateY(0)' : 'translateY(50px)',
//                         opacity: isVisible['pricing'] ? 1 : 0,
//                         transitionDelay: '0.4s'
//                     }}
//                 >
//                     <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
//                         <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-md">
//                             ⚡ MOST POPULAR
//                         </div>
//                     </div>

//                     <div className="relative z-10">
//                         <div className="text-center mb-10">
//                             <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 mb-6">
//                                 <Sparkles className="mr-2 text-purple-600" size={16} />
//                                 <span className="text-sm font-medium text-purple-700">AI-Powered</span>
//                             </div>
//                             <h3 className="text-3xl font-bold text-slate-900 mb-4">Premium Plan</h3>
//                             <div className="flex items-baseline justify-center">
//                                 <span className="text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$21</span>
//                                 <span className="text-2xl text-slate-600 ml-2">/month</span>
//                             </div>
//                             <p className="text-slate-700 mt-4">For professionals ready to dominate their market</p>
//                         </div>

//                         <ul className="space-y-4 mb-10">
//                             {[
//                                 "Unlimited Clients & Invoices",
//                                 "Unlimited AI-generated proposals",
//                                 "Unlimited smart meetings",
//                                 "Advanced AI automation",
//                                 "Custom domain portfolio",
//                                 "Priority support + AI chat"
//                             ].map((feature, index) => (
//                                 <li key={index} className="flex items-center space-x-4">
//                                     <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
//                                         <Check className="text-white" size={16} />
//                                     </div>
//                                     <span className="text-slate-800 font-medium">{feature}</span>
//                                 </li>
//                             ))}
//                         </ul>

//                         <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md">
//                             <span className="relative z-10">Start Premium Plan</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="text-center mt-16">
//                 <button className="group inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-all duration-300">
//                     <span>Compare All Features</span>
//                     <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={20} />
//                 </button>
//             </div>

//             {/* ROI Calculator */}
//             <div className="mt-20 max-w-4xl mx-auto">
//                 <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200">
//                     <div className="text-center mb-8">
//                         <h3 className="text-2xl font-bold text-slate-900 mb-4">💰 ROI Calculator</h3>
//                         <p className="text-slate-600">See how much Groweza saves you:</p>
//                     </div>

//                     <div className="grid md:grid-cols-3 gap-6 text-center">
//                         <div className="space-y-2">
//                             <div className="text-3xl font-bold text-green-600">25hrs</div>
//                             <div className="text-sm text-slate-600">Saved per week</div>
//                         </div>
//                         <div className="space-y-2">
//                             <div className="text-3xl font-bold text-green-600">$2,500</div>
//                             <div className="text-sm text-slate-600">Extra monthly revenue</div>
//                         </div>
//                         <div className="space-y-2">
//                             <div className="text-3xl font-bold text-green-600">11,900%</div>
//                             <div className="text-sm text-slate-600">ROI (vs $21/month)</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>

//     {/* Testimonials */}
//     <section
//         id="testimonials"
//         className="py-32 relative bg-slate-50"
//         data-animate
//     >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//             <div className="text-center mb-20">
//                 <div className="inline-flex items-center px-6 py-2 rounded-full bg-yellow-100 border border-yellow-200 mb-8">
//                     <Star className="mr-2 text-yellow-500" size={16} />
//                     <span className="text-sm font-medium text-yellow-700">Social Proof</span>
//                 </div>
//                 <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
//                     Freelancers Are <span className="text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text">Obsessed</span>
//                 </h2>
//                 <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//                     Join 50,000+ freelancers who've transformed their business with Groweza
//                 </p>
//             </div>

//             <div className="grid lg:grid-cols-3 gap-8">
//                 {[
//                     {
//                         quote: "I went from struggling to book 2 clients to managing 15+ simultaneously. Groweza's AI literally runs my business while I focus on design. Revenue up 340% in 6 months.",
//                         author: "Priya K.",
//                         role: "UX Designer",
//                         avatar: "P",
//                         color: "from-purple-500 to-pink-500",
//                         metrics: { revenue: "+340%", clients: "15 active", time: "30hrs saved/week" }
//                     },
//                     {
//                         quote: "The AI proposal feature is pure magic. It writes better proposals than I ever could, and my close rate went from 20% to 80%. I'm not exaggerating.",
//                         author: "Mark R.",
//                         role: "Web Developer",
//                         avatar: "M",
//                         color: "from-blue-500 to-cyan-500",
//                         metrics: { closeRate: "80%", proposals: "50+ monthly", income: "+$8K/month" }
//                     },
//                     {
//                         quote: "My clients think I have a full team now. The automated follow-ups and smart scheduling make me look like a Fortune 500 company. Best investment ever.",
//                         author: "Sara M.",
//                         role: "Marketing Consultant",
//                         avatar: "S",
//                         color: "from-green-500 to-emerald-500",
//                         metrics: { clients: "23 active", referrals: "+60%", satisfaction: "98%" }
//                     }
//                 ].map((testimonial, index) => (
//                     <div
//                         key={index}
//                         className={`group relative bg-white rounded-3xl p-8 border border-slate-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg`}
//                         style={{
//                             transform: isVisible['testimonials'] ? 'translateY(0)' : 'translateY(50px)',
//                             opacity: isVisible['testimonials'] ? 1 : 0,
//                             transitionDelay: `${index * 0.2}s`
//                         }}
//                     >
//                         <div className="relative z-10">
//                             <div className="flex text-yellow-400 mb-6">
//                                 {[...Array(5)].map((_, i) => (
//                                     <Star
//                                         key={i}
//                                         size={20}
//                                         fill="currentColor"
//                                         className="animate-pulse"
//                                         style={{ animationDelay: `${i * 0.1}s` }}
//                                     />
//                                 ))}
//                             </div>

//                             <blockquote className="text-lg text-slate-600 mb-8 italic leading-relaxed">
//                                 "{testimonial.quote}"
//                             </blockquote>

//                             <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-slate-100 rounded-2xl">
//                                 {Object.entries(testimonial.metrics).map(([key, value], i) => (
//                                     <div key={i} className="text-center">
//                                         <div className={`text-lg font-bold text-slate-900`}>
//                                             {value}
//                                         </div>
//                                         <div className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="flex items-center space-x-4">
//                                 <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md`}>
//                                     {testimonial.avatar}
//                                 </div>
//                                 <div>
//                                     <div className="font-bold text-slate-900 text-lg">{testimonial.author}</div>
//                                     <div className="text-slate-600">{testimonial.role}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-20 text-center">
//                 <div className="inline-flex items-center space-x-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
//                     <div className="flex items-center space-x-2">
//                         <Shield className="text-green-500" size={24} />
//                         <span className="text-slate-800 font-semibold">SOC 2 Certified</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <Eye className="text-blue-500" size={24} />
//                         <span className="text-slate-800 font-semibold">GDPR Compliant</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <Heart className="text-red-500" size={24} />
//                         <span className="text-slate-800 font-semibold">99.9% Uptime</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>

//     {/* Final CTA */}
//     <section className="py-32 relative bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
//             <div className="space-y-8">
//                 <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200">
//                     <Rocket className="mr-2 text-blue-600" size={16} />
//                     <span className="text-sm font-medium text-blue-700">Transform Your Business</span>
//                 </div>

//                 <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
//                     Stop Managing. <br />
//                     Start <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">Dominating.</span>
//                 </h2>

//                 <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
//                     Join the AI revolution. Let Groweza handle the boring stuff while you focus on what you love: creating amazing work and making serious money.
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
//                     <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-full font-bold text-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer shadow-md"
//                         onClick={() => navigate("/login")}>
//                         <span className="relative z-10 flex items-center">
//                             Start Your Transformation
//                             <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform duration-300" size={24} />
//                         </span>
//                         <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     </button>

//                     <div className="text-center sm:text-left">
//                         <div className="text-sm text-slate-600">Free 14-day trial • No credit card required</div>
//                         <div className="text-sm text-slate-500">Cancel anytime • 30-day money-back guarantee</div>
//                     </div>
//                 </div>

//                 <div className="pt-16">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
//                         {[
//                             { label: "Active Users", value: "50,247", icon: Users },
//                             { label: "Revenue Generated", value: "$127M+", icon: TrendingUp },
//                             { label: "Hours Saved", value: "2.1M+", icon: Zap },
//                             { label: "Client Satisfaction", value: "98.7%", icon: Heart }
//                         ].map((stat, i) => (
//                             <div key={i} className="text-center">
//                                 <stat.icon className="mx-auto mb-3 text-purple-500" size={32} />
//                                 <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
//                                 <div className="text-sm text-slate-600">{stat.label}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>

//     {/* Footer */}
//     <footer id="contact" className="relative bg-white py-20 border-t border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//             <div className="grid md:grid-cols-5 gap-12">
//                 <div className="md:col-span-2">
//                     <h3 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
//                         Groweza
//                     </h3>
//                     <p className="text-slate-600 mb-6 max-w-md">
//                         The AI-powered platform that transforms freelancers into business powerhouses. Join the revolution.
//                     </p>
//                     <div className="flex space-x-4">
//                         {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
//                             <a
//                                 key={social}
//                                 href="#"
//                                 className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all duration-300"
//                             >
//                                 {social[0]}
//                             </a>
//                         ))}
//                     </div>
//                 </div>

//                 {[
//                     {
//                         title: "Product",
//                         links: ["Features", "Pricing", "AI Dashboard", "Integrations", "API"]
//                     },
//                     {
//                         title: "Resources",
//                         links: ["Blog", "Case Studies", "Templates", "Community", "Academy"]
//                     },
//                     {
//                         title: "Support",
//                         links: ["Help Center", "Contact", "Status", "Privacy", "Terms"]
//                     }
//                 ].map((section) => (
//                     <div key={section.title}>
//                         <h4 className="font-bold text-slate-900 mb-6">{section.title}</h4>
//                         <ul className="space-y-3">
//                             {section.links.map((link) => (
//                                 <li key={link}>
//                                     <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
//                                         {link}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>

//             <div className="border-t border-slate-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
//                 <p className="text-slate-500 text-sm">
//                     © 2025 Groweza. All rights reserved. Built with 🤖 AI and ❤️ for freelancers.
//                 </p>
//                 <div className="flex items-center space-x-4 mt-4 md:mt-0">
//                     <span className="text-xs text-slate-500">Powered by</span>
//                     <div className="flex items-center space-x-2">
//                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                         <span className="text-xs text-slate-500">AI Engine v2.0</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </footer>

//     {/* Custom CSS for advanced animations */}
//     <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotateZ(0deg); }
//           25% { transform: translateY(-10px) rotateZ(1deg); }
//           50% { transform: translateY(-5px) rotateZ(0deg); }
//           75% { transform: translateY(-15px) rotateZ(-1deg); }
//         }
        
//         @keyframes slideUp {
//           from { 
//             opacity: 0; 
//             transform: translateY(30px) scale(0.95); 
//           }
//           to { 
//             opacity: 1; 
//             transform: translateY(0) scale(1); 
//           }
//         }
        
//         @keyframes pulse-glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.2); }
//           50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.4); }
//         }

//         @keyframes gradient-shift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient-shift 3s ease infinite;
//         }

//         /* Smooth scrolling */
//         html {
//           scroll-behavior: smooth;
//         }

//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: rgba(241, 245, 249);
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(45deg, #a855f7, #ec4899);
//           border-radius: 10px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(45deg, #9333ea, #db2777);
//         }

//         /* Enhanced glow effects */
//         .glow-purple {
//           box-shadow: 0 0 30px rgba(168, 85, 247, 0.1);
//         }

//         /* Text shimmer effect */
//         @keyframes shimmer {
//           0% { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }

//         .text-shimmer {
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
//           background-size: 200% 100%;
//           animation: shimmer 3s infinite;
//           -webkit-background-clip: text;
//           background-clip: text;
//         }
//       `}</style>
// </div>
//     );
// };


// export default GrowezaLanding