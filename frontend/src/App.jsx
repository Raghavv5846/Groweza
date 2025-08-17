import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './publicPages/Landing'
import About from './publicPages/About'
import Contact from './publicPages/Contact'
import Privacy from './publicPages/Privacy'
import Disclaimer from './publicPages/Disclamer'
import Signup from './publicPages/Signup'
import { GoogleOAuthProvider } from '@react-oauth/google'
import EnhancedLogin from './publicPages/Login'
import ProtectedRoute from './helpers/ProtectedRoute'
import AppLayout from './freelancerDashboard/components/AppLayout'
import OnboardingForm from './freelancerDashboard/OnboardingForm'
import Clients from './freelancerDashboard/ClientManagement'
import { ToastContainer } from 'react-toastify'
import PaymentManagement from './freelancerDashboard/PaymentManagement'
import TimeLineManagemnt from './freelancerDashboard/TimeLineManagemnt'
import TaskManagment from './freelancerDashboard/TaskManagment'
import InvoiceManagement from './freelancerDashboard/InvoiceManagement'
import ProposalManagement from './freelancerDashboard/ProposalManagement'
import FreelancerProfile from './freelancerDashboard/FreelancerProfile'
import FreelancerBillings from './freelancerDashboard/FreelancerBillings'
import MeetingManagement from './freelancerDashboard/MeetingManagement'
import AllInvoice from './freelancerDashboard/AllInvoice'
import AllProposal from './freelancerDashboard/AllProposal'
import TemplateSelector from './freelancerDashboard/WebSiteManagement'
import PreviewAndBuild from './freelancerDashboard/PreviewandBuild'
import BillingManagement from './freelancerDashboard/BillingManagement'
import InvoiceTable from './freelancerDashboard/AllInvoice'
import ProposalTable from './freelancerDashboard/AllProposal'
import FreelanceDashboard from './freelancerDashboard/FreelancerDashboard'
import GrowezaLanding from './publicPages/HomePage'
import SubscriptionDashboard from './freelancerDashboard/SubscriptionManagement'
import SubscriptionSuccess from './freelancerDashboard/subscriptionSuccess'
import SubscriptionFailure from './freelancerDashboard/SubscriptionFailure'


function App() {
  const [count, setCount] = useState(0)
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <EnhancedLogin />
      </GoogleOAuthProvider>
    );
  };

  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<GrowezaLanding />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="/disclaimer" element={<Disclaimer />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<GoogleAuthWrapper />} />   
  

    <Route path="/onboarding" element={<ProtectedRoute allowedRole="freelancer"><OnboardingForm /></ProtectedRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute allowedRole="freelancer"><AppLayout/></ProtectedRoute>}>
    <Route index element={<FreelanceDashboard />} />
    <Route path="clients" element={<Clients />} />
    <Route path="payments" element={<PaymentManagement />} />
    <Route path="timeline" element={<TimeLineManagemnt />} />
    <Route path="tasks" element={<TaskManagment />} />
    <Route path="invoices" element={<InvoiceManagement />} />
    <Route path="proposals" element={<ProposalManagement />} />
    <Route path="meetings" element = {<MeetingManagement />} />
    <Route path="me" element={<FreelancerProfile />} />
    <Route path="my-website" element={<TemplateSelector />} /> 
    <Route path="preview" element={<PreviewAndBuild />} />          
    <Route path="my-invoice" element={<InvoiceTable />} />
    <Route path="all-proposal" element={<ProposalTable />} />
    <Route path="my-billings" element={<BillingManagement />} />
    <Route path="my-subscriptions" element={<SubscriptionDashboard />} />
    <Route path="subscription/success" element={<SubscriptionSuccess />} />
    <Route path="subscription/cancel" element={<SubscriptionFailure/>} />
          
         


          

    </Route>


  <Route path="*" element={<h1>404 Not Found</h1>} />
        {/* Toastify Container - Placed at the top level of the component */}

</Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
</BrowserRouter>
  )
}

export default App
