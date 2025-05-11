import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import OrderView from './pages/Dashboard/OrderView';
import RunSheet from './pages/Dashboard/RunSheet';
import Settings from './pages/Dashboard/Settings';
import ProofView from './pages/ProofView';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders/:orderId" element={<OrderView />} />
        <Route path="/run-sheet" element={<RunSheet />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/:storeName/:orderId" element={<ProofView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
