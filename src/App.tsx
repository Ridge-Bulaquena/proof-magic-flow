
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Dashboard/Orders';
import RunSheetPage from './pages/Dashboard/RunSheetPage';
import ProofHistoryPage from './pages/Dashboard/ProofHistoryPage';
import UploadProofPage from './pages/Dashboard/UploadProofPage';
import Account from './pages/Dashboard/Account';
import SettingsPage from './pages/Dashboard/SettingsPage';
import ProofView from './pages/ProofView';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="run-sheet" element={<RunSheetPage />} />
          <Route path="proof-history" element={<ProofHistoryPage />} />
          <Route path="upload" element={<UploadProofPage />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Public Routes */}
        <Route path="/:storeName/:orderId" element={<ProofView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
