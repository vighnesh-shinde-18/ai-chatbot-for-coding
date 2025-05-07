// src/App.jsx
import Hero from "./components/Hero";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import FeaturePage from "./components/FeaturePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/debug" element={<FeaturePage selectedFeature="codeDebugging" />} />
        <Route path="/review" element={<FeaturePage selectedFeature="codeReview" />} />
        <Route path="/generate" element={<FeaturePage selectedFeature="codeGeneration" />} />
        <Route path="/convert" element={<FeaturePage selectedFeature="convertCode" />} />
        <Route path="/explain" element={<FeaturePage selectedFeature="explainCode" />} />
        <Route path="/testcases" element={<FeaturePage selectedFeature="generateTestCases" />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
