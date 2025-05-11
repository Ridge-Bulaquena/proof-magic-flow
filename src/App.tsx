import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Dashboard/Orders';
import RunSheet from './pages/Dashboard/RunSheet';
import ProofHistory from './pages/Dashboard/ProofHistory';
import UploadProof from './pages/Dashboard/UploadProof';
import Account from './pages/Dashboard/Account';
import Settings from './pages/Dashboard/Settings';
import ProofView from './pages/ProofView';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="run-sheet" element={<RunSheet />} />
          <Route path="proof-history" element={<ProofHistory />} />
          <Route path="upload" element={<UploadProof />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Public Routes */}
        <Route path="/:storeName/:orderId" element={<ProofView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
