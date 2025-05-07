import Sidebar from "@/components/Sidebar";
// import HistoryDialog from "@/components/HistoryDialog";
import { useState } from "react";

 
const Dashboard = ({ isLoggedIn = false }) => {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isLoggedIn = {isLoggedIn} onHistoryClick={() => setHistoryOpen(true)} selectedFeature = ""  />
      <main className="flex justify-center items-center flex-col w-full bg-gray-100 dark:bg-black text-black dark:text-white p-6">
        <h1 className="text-5xl font-bold">Welcome to Code Assistant</h1>
        <p className="text-muted-foreground mt-4 text-xl">Choose a feature from the sidebar to get started.</p>
      </main>&& <HistoryDialog open={historyOpen} setOpen={setHistoryOpen} historyData={mockHistory} />
    </div>
  );
};

export default Dashboard;
