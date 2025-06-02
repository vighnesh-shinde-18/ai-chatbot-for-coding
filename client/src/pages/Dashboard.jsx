import Sidebar from "@/components/Sidebar";
import HistoryDialog from "@/components/HistoryDialog";
import { useState } from "react";

const Dashboard = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-black dark">
      <Sidebar 
        onHistoryClick={() => setHistoryOpen(true)}
        selectedFeature=""
      />
      <main className="flex-1 flex justify-center items-center p-4 sm:p-0 bg-white dark:bg-black text-black dark:text-white">
        <div className="text-center max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Welcome to Code Assistant
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">
            Choose a feature from the sidebar to get started.
          </p>
        </div>
      </main>
      {historyOpen && <HistoryDialog onClose={() => setHistoryOpen(false)} />}
    </div>  
  );
};

export default Dashboard;