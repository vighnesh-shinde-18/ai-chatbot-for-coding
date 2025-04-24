import { Routes, Route, Navigate } from 'react-router-dom'
import Hero from './pages/Hero'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import ChatBotPage from './pages/ChatBotPage'

// Feature pages (create these as separate components)
import DebugPage from './pages/DebugPage'
import ReviewPage from './pages/ReviewPage'
import GeneratePage from './pages/GeneratePage'
import ExplainPage from './pages/ExplainPage'
import ConvertPage from './pages/ConvertPage'
import TestCasesPage from './pages/TestCasesPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ChatBotPage" element={<ChatBotPage />} />

      {/* Feature Routes */}
      <Route path="/debug" element={<DebugPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/generate" element={<GeneratePage />} />
      <Route path="/explain" element={<ExplainPage />} />
      <Route path="/convert" element={<ConvertPage />} />
      <Route path="/testcases" element={<TestCasesPage />} />

      {/* Optional: Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
