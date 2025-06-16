import Sidebar from "@/components/Sidebar";
import HistoryDialog from "@/components/HistoryDialog";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate  } from "react-router-dom";


const Dashboard = () => {
  const [historyOpen, setHistoryOpen] = useState(false);

  const navigate = useNavigate();
 useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    navigate("/login");
  }
}, [navigate]);


  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-white text-primary">
      {/* Sidebar */}
      <Sidebar
        onHistoryClick={() => setHistoryOpen(true)}
        selectedFeature=""
      />

      {/* Main Dashboard Content */}
      <main className="flex-1 flex justify-center items-center p-6 bg-white">
        <div className="text-center max-w-2xl space-y-4">
          <div className="flex justify-center items-center gap-2 text-indigo-600 animate-pulse">
            <Sparkles className="w-6 h-6" />
            <h1 className="text-3xl sm:text-5xl font-bold">
              Welcome to DSA Buddy
            </h1>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg">
            Your personal AI assistant for mastering DSA — debug, generate, convert, and optimize code with intelligence.
          </p>
          <p className="text-sm text-muted-foreground italic">
            “Every great coder was once a beginner who never gave up.”
          </p>
          <p className="text-sm sm:text-base font-medium text-primary">
            👉 Select a feature from the sidebar to get started.
          </p>
        </div>
      </main>

      {/* History Dialog */}
      {historyOpen && <HistoryDialog onClose={() => setHistoryOpen(false)} />}
    </div>
  );
};

export default Dashboard;
