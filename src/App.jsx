import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useAuthStore } from './store/authStore';

const Landing = lazy(() => import('./pages/Landing'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Results = lazy(() => import('./pages/Results'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Pricing = lazy(() => import('./pages/Pricing'));
const SharedScore = lazy(() => import('./pages/SharedScore'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/score/:shareId" element={<SharedScore />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
