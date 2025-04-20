
import { Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ChatBotPage from './pages/ChatBotPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path='/ChatBotPage' element = {<ChatBotPage/>} />
    </Routes>
  );
}
