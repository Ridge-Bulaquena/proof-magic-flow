
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import OrdersPage from './pages/Dashboard/OrdersPage';
import RunSheetPage from './pages/Dashboard/RunSheetPage';
import ProofHistoryPage from './pages/Dashboard/ProofHistoryPage';
import UploadProofPage from './pages/Dashboard/UploadProofPage';
import Account from './pages/Dashboard/Account';
import SettingsPage from './pages/Dashboard/SettingsPage';
import ProofView from './pages/ProofView';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/hooks/use-toast';
import Index from './pages/Index';
import OnboardingWizard from './pages/Onboarding';

// Wrapper component to extract params and pass to ProofView
const ProofViewWrapper = () => {
  const { storeName = "", orderId = "" } = useParams<{storeName: string, orderId: string}>();
  return <ProofView storeName={storeName} orderId={orderId} />;
};

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Landing Page (Index) as Root Route */}
          <Route path="/" element={<Index />} />
          
          {/* Onboarding Route */}
          <Route path="/onboarding" element={<OnboardingWizard />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="run-sheet" element={<RunSheetPage />} />
            <Route path="proof-history" element={<ProofHistoryPage />} />
            <Route path="upload" element={<UploadProofPage />} />
            <Route path="account" element={<Account />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Public Routes */}
          <Route path="/:storeName/:orderId" element={<ProofViewWrapper />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ToastProvider>
  );
}

export default App;
