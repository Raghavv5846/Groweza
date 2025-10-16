
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { TemplateMinimal } from './invoiceTemplates/TemplateMinimal';
// import { TemplateColorful } from './invoiceTemplates/TemplateColorful';
// import { TemplateCorporate } from './invoiceTemplates/CorporateGride';
// import { TemplateElegant } from './invoiceTemplates/ElegantCard';
// import TemplateClassic from './invoiceTemplates/TemplateClassic';
// import InvoiceLogoUploader from './components/LogoUploader';

// const templateComponents = {
//   Minimal: TemplateMinimal,
//   Colorful: TemplateColorful,
//   Corporate: TemplateCorporate,
//   Elegant: TemplateElegant,
//   Classic: TemplateClassic,
// };

// const InvoiceManagement = () => {
//   const [clients, setClients] = useState([]);
//   const [selectedClientId, setSelectedClientId] = useState('');
//   const [selectedWorks, setSelectedWorks] = useState([]);
//   const [template, setTemplate] = useState('Minimal');
//   const [notes, setNotes] = useState('');
//   const token = localStorage.getItem('authToken');
//   const [user, setUser] = useState(null);
//   const [invoiceNumber, setInvoiceNumber] = useState('');

//   const fetchUserAndClients = async () => {
//     try {
//       const [userRes, clientsRes] = await Promise.all([
//         axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//       ]);
//       setUser(userRes.data);
//       setClients(clientsRes.data);
//     } catch (err) {
//       toast.error('Failed to load user/clients');
//     }
//   };
//   const generateInvoiceNumber = () => {
//     const currentYear = new Date().getFullYear();
//     const random = Math.floor(1000 + Math.random() * 9000); // e.g., 5873
//     return `INV-${currentYear}-${random}`;
//   };


//   useEffect(() => {
//     fetchUserAndClients();
//   }, []);

//   useEffect(() => {
//     if (selectedClientId && selectedWorks.length > 0) {
//       const newInvoiceNumber = generateInvoiceNumber();
//       setInvoiceNumber(newInvoiceNumber);
//     }
//   }, [selectedClientId, selectedWorks]);


//   const client = clients.find((c) => c._id === selectedClientId);
//   const works = client?.works || [];
//   const selectedWorkItems = works.filter((w) => selectedWorks.includes(w._id));
//   const TemplateComponent = templateComponents[template];

//   const handleWorkSelection = (workId) => {
//     setSelectedWorks((prev) =>
//       prev.includes(workId) ? prev.filter((id) => id !== workId) : [...prev, workId]
//     );
//   };

//   const totalCost = selectedWorkItems.reduce((acc, work) => acc + (work.cost || 0), 0);

//   const handleSaveInvoice = async () => {
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/invoices`,
//         {
//           clientId: selectedClientId,
//           workIds: selectedWorks,
//           template,
//           notes,
//           invoiceNumber,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success('Invoice saved to records');
//     } catch (err) {
//       toast.error('Failed to save invoice');
//     }
//   };

//   if (!user?.invoiceLogo) {
//     return (
//       <div className="p-6 bg-yellow-100 rounded shadow">
//         <h2 className="text-xl font-bold mb-4">Add Invoice Logo</h2>
//         <p className="mb-4">To generate invoices, please upload your invoice logo first.</p>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           <InvoiceLogoUploader fetchUserAndClients={fetchUserAndClients} />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 w-full">
//       <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>

//       {/* Invoice Form */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6">
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Select Client</label>
//           <select
//             className="w-full border px-3 py-2 rounded"
//             value={selectedClientId}
//             onChange={(e) => {
//               setSelectedClientId(e.target.value);
//               setSelectedWorks([]);
//             }}
//           >
//             <option value="">-- Select Client --</option>
//             {clients.map((client) => (
//               <option key={client._id} value={client._id}>
//                 {client.name} ({client.email})
//               </option>
//             ))}
//           </select>
//         </div>

//         {client && (
//           <>
//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Select Work(s)</label>
//               <div className="grid grid-cols-2 gap-2">
//                 {client.works.map((work) => (
//                   <label key={work._id} className="flex items-center gap-2 border p-2 rounded">
//                     <input
//                       type="checkbox"
//                       checked={selectedWorks.includes(work._id)}
//                       onChange={() => handleWorkSelection(work._id)}
//                     />
//                     <span>
//                       {work.fieldOfWork} - ₹{work.cost}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Select Template</label>
//               <select
//                 className="w-full border px-3 py-2 rounded"
//                 value={template}
//                 onChange={(e) => setTemplate(e.target.value)}
//               >
//                 {Object.keys(templateComponents).map((key) => (
//                   <option key={key} value={key}>
//                     {key}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Additional Notes</label>
//               <textarea
//                 className="w-full border px-3 py-2 rounded"
//                 rows="3"
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//               ></textarea>
//             </div>

//             <div className="flex gap-4">
//               <button
//                 onClick={() => toast.info('Send to WhatsApp - To be implemented')}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Send to WhatsApp
//               </button>
//               <button
//                 onClick={() => toast.info('Send via Email - To be implemented')}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Send via Email
//               </button>
//               <button
//                 onClick={() => window.print()}
//                 className="bg-gray-700 text-white px-4 py-2 rounded"
//               >
//                 Print / Download
//               </button>
//               <button
//                 onClick={handleSaveInvoice}
//                 className="bg-purple-600 text-white px-4 py-2 rounded"
//               >
//                 Save to DB
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Preview Section */}
//       {client && selectedWorkItems.length > 0 && user && (
//         <div className="bg-white shadow p-4 rounded print:border print:p-0">
//           <TemplateComponent
//             freelancer={user}
//             client={client}
//             works={selectedWorkItems}
//             notes={notes}
//             total={totalCost}
//             logo={user.invoiceLogo}
//             invoiceNumber={invoiceNumber}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoiceManagement;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { TemplateMinimal } from './invoiceTemplates/TemplateMinimal';
import { TemplateColorful } from './invoiceTemplates/TemplateColorful';
import { TemplateCorporate } from './invoiceTemplates/CorporateGride';
import { TemplateElegant } from './invoiceTemplates/ElegantCard';
import TemplateClassic from './invoiceTemplates/TemplateClassic';
import InvoiceLogoUploader from './components/LogoUploader';
import { Check, Crown, X, Zap } from 'lucide-react';
import { isLimitReached } from '../helpers/CheckLimit';

// Template components mapping for dynamic rendering
const templateComponents = {
  Minimal: TemplateMinimal,
  Colorful: TemplateColorful,
  Corporate: TemplateCorporate,
  Elegant: TemplateElegant,
  Classic: TemplateClassic,
};
// Define allowed templates
const basicTemplates = ["Minimal", "Colorful"];
const premiumTemplates = ["Corporate", "Elegant", "Classic"];


const InvoiceManagement = () => {
  // State management for component data
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedWorks, setSelectedWorks] = useState([]);
  const [template, setTemplate] = useState('Minimal');
  const [notes, setNotes] = useState('');
  const [user, setUser] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [subscription, setSubscription] = useState(null);

  // Get authentication token from localStorage
  const token = localStorage.getItem('authToken');


  // Fetch Subscription =>
  // need to see if it works tomorrow 
  useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
          return;
      }

      axios
          .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
              headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setUser(res.data))
          .catch(() => setUser(null))
  }, []);
  const isInvoicesLimitReached = isLimitReached(user, "invoices");


  // find active subscription (PayPal/Stripe etc.)
  const activeSub = user?.subscriptions?.find(sub => sub.active);

  // check premium
  const isPremium =
    activeSub?.plan === "Premium" || user?.subscription?.plan === "Premium";

  // check if a premium-only template is selected but user is not premium
  const isPremiumTemplateSelected =
    premiumTemplates.includes(template) && !isPremium;


  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/subscription/me`)
  //     .then((res) => setSubscription(res.data))
  //     .catch((err) => console.error("Error fetching subscription:", err));
  // }, []);

  // const isInvoicesLimitReached =
  //   subscription?.limits?.invoices?.used >= subscription?.limits?.invoices?.max;

  // const isPremium = subscription?.plan === "Premium";
  // const isPremiumTemplateSelected =
  //   premiumTemplates.includes(template) && !isPremium;




  // Fetch user data and clients from API
  const fetchUserAndClients = async () => {
    setIsLoading(true);
    try {
      const [userRes, clientsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setUser(userRes.data);
      setClients(clientsRes.data);
    } catch (err) {
      toast.error('Failed to load user/clients');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate unique invoice number with year and random digits
  const generateInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000); // e.g., 5873
    return `INV-${currentYear}-${random}`;
  };

  // Initialize component data on mount
  useEffect(() => {
    fetchUserAndClients();
  }, []);

  // Generate new invoice number when client or works change
  useEffect(() => {
    if (selectedClientId && selectedWorks.length > 0) {
      const newInvoiceNumber = generateInvoiceNumber();
      setInvoiceNumber(newInvoiceNumber);
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  }, [selectedClientId, selectedWorks]);

  // Derived state for selected client and works
  const client = clients.find((c) => c._id === selectedClientId);
  const works = client?.works || [];
  const selectedWorkItems = works.filter((w) => selectedWorks.includes(w._id));
  const TemplateComponent = templateComponents[template];

  // Handle work selection for invoice
  const handleWorkSelection = (workId) => {
    setSelectedWorks((prev) =>
      prev.includes(workId) ? prev.filter((id) => id !== workId) : [...prev, workId]
    );
  };

  // Calculate total cost of selected works
  const totalCost = selectedWorkItems.reduce((acc, work) => acc + (work.cost || 0), 0);

  // Save invoice to database
  const handleSaveInvoice = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/invoices`,
        {
          clientId: selectedClientId,
          workId: selectedWorks,
          amount:totalCost,
          template,
          notes,
          invoiceNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Invoice saved to records');
    } catch (err) {
      toast.error('Failed to save invoice');
    } finally {
      setIsLoading(false);
    }
  };

  const forceFallbackColors = () => {
    const root = document.documentElement.style;

    root.setProperty('--background', '#ffffff');
    root.setProperty('--foreground', '#000000');
    root.setProperty('--primary', '#1E3A8A');
    root.setProperty('--secondary', '#888888');
    root.setProperty('--accent', '#FFD700');
    root.setProperty('--muted', '#f0f0f0');
    root.setProperty('--border', '#e0e0e0');
    root.setProperty('--ring', '#cccccc');

    // Add any others you're using
  };



  // const handleDownloadPDF = () => {
  //   const input = document.getElementById('invoice-preview');

  //   forceFallbackColors(); // apply fallback styles

  //   html2canvas(input, { scale: 2 })
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //       pdf.save(`Invoice_${Date.now()}.pdf`);
  //     })
  //     .catch((err) => {
  //       console.error("PDF generation failed:", err);
  //     });
  // };





  const handleDownloadPDF = () => {
    const input = document.getElementById('invoice-preview');

    domtoimage.toPng(input)
      .then((dataUrl) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (img.height * pdfWidth) / img.width;
          pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`Invoice_${Date.now()}.pdf`);
        };
      })
      .catch((err) => {
        console.error('PDF generation failed:', err);
      });
  };




  const sendInvoiceToClient = async ({ clientName, clientEmail }) => {
    const input = document.getElementById('invoice-preview');
    if (!input) return alert("Invoice preview not found.");

    try {
      const dataUrl = await domtoimage.toPng(input);
      const pdf = new jsPDF();
      const img = new Image();
      img.src = dataUrl;

      await new Promise((resolve) => {
        img.onload = () => {
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (img.height * pdfWidth) / img.width;
          pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
          resolve();
        };
      });

      const pdfBlob = pdf.output('blob');

      const formData = new FormData();
      formData.append('clientName', clientName);
      formData.append('clientEmail', clientEmail);
      formData.append('pdf', pdfBlob, `Invoice_${Date.now()}.pdf`);

      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/invoices/send-invoice`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Invoice sent successfully!');
    } catch (err) {
      console.error('Error sending invoice:', err);
      toast.error('Failed to send invoice.');
    }
  };


  // Show logo upload screen if user hasn't uploaded logo yet
  if (!user?.invoiceLogo) {
    return (
      <>
        {/* Main Container - Enhanced with Groweza-inspired gradient and responsive design */}
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6 lg:p-8 w-full">

          {/* Center Container - Improved max-width for better responsiveness */}
          <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">

            {/* Main Card - Enhanced with better shadows, animations, and Groweza colors */}
            <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 p-6 md:p-8 lg:p-10 transform transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-200/50 animate-fade-in backdrop-blur-sm">

              {/* Header Section - Improved spacing and typography */}
              <div className="text-center mb-8 md:mb-10">

                {/* Logo Icon - Enhanced with Groweza gradient and animations */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg shadow-indigo-300/30 animate-pulse-slow hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Title - Enhanced with responsive typography and animation */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 md:mb-3 animate-slide-up">
                  Add Invoice Logo
                </h2>

                {/* Subtitle - Improved readability and spacing */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed animate-slide-up-delay">
                  To generate invoices, please upload your invoice logo first.
                </p>
              </div>

              {/* Upload Component Container - Enhanced hover effects and animations */}
              <div className="transform transition-all duration-300 hover:scale-[1.02] animate-fade-in-delay ">
                {/* InvoiceLogoUploader component will be rendered here */}
                <InvoiceLogoUploader fetchUserAndClients={fetchUserAndClients} className="cursor-pointer" />
              </div>
            </div>

            {/* Additional Info Card - New responsive info section */}
            <div className="hidden md:block mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md animate-fade-in-slow">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <span>Your logo will appear on all generated invoices</span>
              </div>
            </div>
          </div>

          {/* Background Decorative Elements - Subtle animated background */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            {/* Floating circles with Groweza-inspired colors */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-20 animate-float"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-20 animate-float-delay"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full opacity-10 animate-spin-slow"></div>
          </div>
        </div>

        {/* Custom CSS Animations - Smooth and professional animations */}
        <style jsx>{`
        /* Fade in animation for main elements */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Slide up animation for text elements */
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Float animation for background elements */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        /* Slow spin for large background circle */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Animation classes with staggered timing */
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-slow {
          animation: fade-in 1.2s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.7s ease-out;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.9s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 6s ease-in-out infinite 2s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        /* Hide decorative elements on mobile for performance */
        @media (max-width: 640px) {
          .animate-float,
          .animate-float-delay,
          .animate-spin-slow {
            display: none;
          }
        }
      `}</style>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50  md:p-6 w-full p-20">
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Create <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Professional Invoice</span>
          </h1>
          <p className="text-gray-600 text-lg">Generate beautiful invoices in minutes</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          {/* Invoice Form */}
          <div className="space-y-6 animate-slide-right">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full mr-3"></div>
                <h2 className="text-xl font-bold text-gray-800">Invoice Details</h2>
              </div>

              {/* Client Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Client</label>
                <select
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white cursor-pointer"
                  value={selectedClientId}
                  onChange={(e) => {
                    setSelectedClientId(e.target.value);
                    setSelectedWorks([]);
                  }}
                >
                  <option  className="cursor-pointer" value="">-- Select Client --</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name} ({client.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Works Selection */}
              {client && (
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Select Work(s)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {client.works.map((work) => (
                        <label
                          key={work._id}
                          className="flex items-center gap-3 border-2 border-gray-200 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:border-purple-300 hover:shadow-md"
                        >
                          <input
                            type="checkbox"
                            checked={selectedWorks.includes(work._id)}
                            onChange={() => handleWorkSelection(work._id)}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                          />
                          <span className="text-gray-700 font-medium">
                            {work.fieldOfWork} - ₹{work.cost?.toLocaleString()}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Template Selection */}
                  {/* <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Template</label>
                    <select
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white cursor-pointer"
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                    >
                      {Object.keys(templateComponents).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div> */}

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Template
                    </label>
                    <select
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white cursor-pointer"
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                    >
                      {Object.keys(templateComponents).map((key) => (
                        <option key={key} value={key} disabled={!isPremium && premiumTemplates.includes(key)}>
                          {key} {!isPremium && premiumTemplates.includes(key) ? "🔒" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Additional Notes */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
                      rows="4"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any additional notes or terms..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* <button
                      onClick={() => toast.info('Send to WhatsApp - To be implemented')}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      WhatsApp
                    </button> */}
                    {/* <button
                      onClick={() =>
                        isInvoicesLimitReached ? setShowUpgradeModal(true) :                   
                      }
                      disabled={false} // still clickable, just changes behavior
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 transform active:scale-95 shadow-lg ${isInvoicesLimitReached
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                        }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      {isInvoicesLimitReached ? "Upgrade to Unlock" :  <button
                      onClick={()=>{sendInvoiceToClient ({ clientName: client.name, clientEmail: client.email })}}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Download
                    </button>
                    <button
                      onClick={handleSaveInvoice}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                          </svg>
                          Save
                        </>
                      )}
                    </button>}
                    </button> */}

                    {/* Invoice Action Button / Upgrade Button */}
                    {/* <button
                      onClick={() =>
                        isInvoicesLimitReached ? setShowUpgradeModal(true) : null
                      }
                      disabled={false}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 transform active:scale-95 shadow-lg ${isInvoicesLimitReached
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                        }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      {isInvoicesLimitReached ? (
                        "Upgrade to Unlock"
                      ) : (
                        "Invoice Actions"
                      )}
                    </button> */}

                    {/* Only show these actions if NOT limited */}
                    {/* {!isInvoicesLimitReached && (
                      <div className="flex gap-3 mt-3">
                        {/* Email */}
                        {/* <button
                          onClick={() =>
                            sendInvoiceToClient({ clientName: client.name, clientEmail: client.email })
                          }
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Email
                        </button> */ }

                        {/* Download */}
                        {/* <button
                          onClick={handleDownloadPDF}
                          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                            />
                          </svg>
                          Download
                        </button> */}

                        {/* Save */}
                        {/* <button
                          onClick={handleSaveInvoice}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                />
                              </svg>
                              Save
                            </>
                          )}
                        </button>
                      </div>
                    )} */}


                    {/* <button
                      onClick={()=>{sendInvoiceToClient ({ clientName: client.name, clientEmail: client.email })}}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Download
                    </button>
                    <button
                      onClick={handleSaveInvoice}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                          </svg>
                          Save
                        </>
                      )}
                    </button> */}
                  </div>

                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Main Upgrade / Invoice Actions Button */}
                    <button
                      onClick={() =>
                        isPremiumTemplateSelected
                          ? setShowUpgradeModal(true)
                          : isInvoicesLimitReached
                            ? setShowUpgradeModal(true)
                            : null
                      }
                      disabled={isPremiumTemplateSelected || isInvoicesLimitReached}
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 transform active:scale-95 shadow-lg w-full
      ${isPremiumTemplateSelected || isInvoicesLimitReached
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl cursor-pointer"
                        }`}
                    >
                      {isPremiumTemplateSelected
                        ? "Premium Only 🔒"
                        : isInvoicesLimitReached
                          ? "Upgrade to Unlock"
                          : "Invoice Actions"}
                    </button>

                    {/* Secondary actions (responsive) */}
                    {!isPremiumTemplateSelected && !isInvoicesLimitReached && (
                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full sm:col-span-1 lg:col-span-3">
                        {/* Email */}
                        <button
                          onClick={() =>
                            sendInvoiceToClient({ clientName: client.name, clientEmail: client.email })
                          }
                          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          📧 Email
                        </button>

                        {/* Download */}
                        <button
                          onClick={handleDownloadPDF}
                          className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          ⬇️ Download
                        </button>

                        {/* Save */}
                        <button
                          onClick={handleSaveInvoice}
                          disabled={isLoading}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            "💾 Save"
                          )}
                        </button>
                      </div>
                    )}
                  </div>


                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className={`animate-slide-left ${showPreview ? 'block' : 'hidden xl:block'}`}>
            {client && selectedWorkItems.length > 0 && user ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl print:shadow-none print:rounded-none">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full mr-3"></div>
                    <h2 className="text-xl font-bold text-gray-800">Invoice Preview</h2>
                  </div>
                  <div className="text-sm text-gray-500">
                    Total: ₹{totalCost.toLocaleString()}
                  </div>
                </div>
                <div
                  className="bg-white shadow p-4 rounded print:border print:p-0"
                  id="invoice-preview" // 👈 Add this
                >
                <div className="transform transition-all duration-300 hover:scale-[1.02]" >
                  <TemplateComponent
                    freelancer={user}
                    client={client}
                    works={selectedWorkItems}
                    notes={notes}
                    total={totalCost}
                    logo={user.invoiceLogo}
                    invoiceNumber={invoiceNumber}
                  />
                </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Invoice Preview</h3>
                  <p className="text-gray-500">Select a client and work items to see the preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* upgrade modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white relative">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
              >
                <X size={20} />
              </button>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <Crown size={32} className="text-yellow-300" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Upgrade Required</h2>
                <p className="text-purple-100 opacity-90">
                  Unlock unlimited potential with Professional
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm mb-4">
                  You've reached the limit for adding clients in the <span className="font-semibold text-gray-800">Basic Plan</span>.
                </p>

                {/* Features List */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                    <Zap size={16} className="text-purple-600" />
                    Professional Features
                  </h3>
                  <div className="space-y-2 text-sm">
                    {[
                      'Unlimited clients & meetings',
                      'Advanced scheduling tools',
                      'Custom branding options',
                      'Priority support'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <Check size={10} className="text-white" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium cursor-pointer"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => alert("Redirect to PayPal/Upgrade Flow")}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                >
                  Upgrade Now
                </button>
              </div>

              {/* Trust Badge */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  🔒 Secure payment • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 w-full">
          <div className=" mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }
        .animate-slide-right {
          animation: slide-right 0.8s ease-out;
        }
        .animate-slide-left {
          animation: slide-left 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InvoiceManagement;