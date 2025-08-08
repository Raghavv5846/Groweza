import { ArrowRight, Users, DollarSign, Calendar, CheckCircle2, FileText, TrendingUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Client Management",
      description: "Organize and manage all your clients in one centralized dashboard with diverse profiles and project tracking."
    },
    {
      icon: FileText,
      title: "Professional Invoices",
      description: "Create stunning, customizable invoices with multiple templates and automated PDF generation."
    },
    {
      icon: DollarSign,
      title: "Payment Tracking",
      description: "Monitor all payments, track due dates, and view realtime payment intelligent reminders."
    },
    {
      icon: CheckCircle2,
      title: "Task Management",
      description: "Create and manage tasks for each client project to stay organized."
    },
    {
      icon: TrendingUp,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and reliable infrastructure."
    },
    {
      icon: Calendar,
      title: "Mobile Friendly",
      description: "Access your business from anywhere with our responsive mobile design."
    }
  ];

  const testimonials = [
    {
      text: "Groweza has completely transformed how I manage my freelance business. The invoice templates are gorgeous!",
      author: "Sarah Johnson",
      role: "Graphic Designer"
    },
    {
      text: "Finally, a platform that understands freelancers! The payment tracking feature when has saved me hours.",
      author: "Mike Chen",
      role: "Web Developer"
    },
    {
      text: "The mobile app is awesome! I manage everything on the go, which aligns with my lifestyle.",
      author: "Emma Davis",
      role: "Content Writer"
    }
  ];

  const freeFeatures = [
    "Unlimited clients and projects",
    "Professional invoice templates",
    "Payment tracking & reminders",
    "Task management tools",
    "Mobile-responsive design",
    "WhatsApp integration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Groweza Logo" 
              className="w-10 h-10 rounded-lg shadow-lg"
            />
            <h1 className="text-2xl font-bold gradient-logo">Groweza</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
            <a href="#free-platform" className="text-gray-600 hover:text-gray-900 transition-colors">Free Platform</a>
            <Button 
              variant="outline"
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
         <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
           Your Complete <span className="gradient-logo">Freelance</span> Business Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage clients, create professional invoices, track payments, and grow your freelance business - all in one beautiful, mobile-first platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="btn-gradient-primary text-white px-8 py-4 text-lg cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Start Free Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg border-2 hover:bg-gray-50 cursor-pointer"
            >
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500">No credit card required • Always Free</p>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 border-4 border-blue-200">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-4">
                <div className="flex space-x-1 mr-2">
                  <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">Groweza Dashboard</span>
              </div>
              <div className="bg-white/10 rounded-lg p-6 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">G</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Beautiful Dashboard</h3>
                <p className="text-white/80">Manage your entire freelance business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to <span className="gradient-logo">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed specifically for freelancers who want to focus on their craft, not paperwork.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = [
              'from-blue-500 to-blue-600',
              'from-purple-500 to-purple-600',
              'from-green-500 to-green-600',
              'from-orange-500 to-orange-600',
              'from-red-500 to-red-600',
              'from-indigo-500 to-indigo-600'
            ];
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-r ${colors[index]} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loved by <span className="gradient-logo">Freelancers</span> Worldwide
          </h2>
          <p className="text-xl text-gray-600">Join thousands who've transformed their freelance business</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Free Platform Section */}
      <section id="free-platform" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Completely <span className="gradient-logo">Free</span> Platform
          </h2>
          <p className="text-xl text-gray-600">All features available at no cost - forever!</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-4 border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Free Forever</CardTitle>
              <p className="text-gray-600">No hidden costs, no subscription fees</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
              <Button 
                size="lg" 
                className="w-full btn-gradient-primary text-white mt-6"
                onClick={() => navigate('/login')}
              >
                Start Using Groweza Free
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Freelance Business?</h2>
          <p className="text-xl opacity-90">
            Join thousands of freelancers who've streamlined their business with Groweza
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/logo.png" 
                  alt="Groweza Logo" 
                  className="w-8 h-8 rounded-lg"
                />
                <span className="font-bold text-xl">Groweza</span>
              </div>
              <p className="text-gray-400">The complete freelance business platform for modern professionals.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Free Platform</div>
                <div>Templates</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <a href="/contact" className="hover:text-white transition-colors block">Contact Us</a>
                <div>Status</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <a href="/about" className="hover:text-white transition-colors block">About</a>
                <div>Blog</div>
                <div>Careers</div>
                <a href="/privacy" className="hover:text-white transition-colors block">Privacy Policy</a>
                <a href="/disclaimer" className="hover:text-white transition-colors block">Disclaimer</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Groweza. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
