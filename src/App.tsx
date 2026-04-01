import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from './layout/MainLayout';
import { Toaster } from "sonner";
import Loader from './components/Loader';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Service = lazy(() => import('./pages/Service'));
const Works = lazy(() => import('./pages/Works'));
const Careers = lazy(() => import('./pages/Careers'));

// Lazy load components (detail pages)
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const ServiceDetails = lazy(() => import('./components/ServiceDetails'));
const InternshipDetails = lazy(() => import('./components/InternshipDetails'));
const JobDetails = lazy(() => import('./components/JobDetails'));

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />

      {/* Suspense wraps all lazy routes */}
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/works" element={<Works />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/internship/:id" element={<InternshipDetails />} />
            <Route path="/careers/:id" element={<JobDetails />} />
          </Route>
        </Routes>
      </Suspense>

    </BrowserRouter>
  )
}

export default App;