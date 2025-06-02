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
        <Route path="/debug" element={<FeaturePage requiredFeature="codeDebugging" outputResponse="" userInput = "// Enter your code here.."/>} />
        <Route path="/review" element={<FeaturePage requiredFeature="codeReview" outputResponse="" userInput = "// Enter your code here.."/>} />
        <Route path="/generate" element={<FeaturePage requiredFeature="codeGeneration" outputResponse="" userInput = "// Enter your code here.."/>} />
        <Route path="/convert" element={<FeaturePage requiredFeature="convertCode" outputResponse="" userInput = "// Enter your code here.."/>} />
        <Route path="/explain" element={<FeaturePage requiredFeature="explainCode" outputResponse="" userInput = "// Enter your code here.."/>} />
        <Route path="/testcases" element={<FeaturePage requiredFeature="generateTestCases" outputResponse="" userInput = "// Enter your code here.."/>} />
      </Routes>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
