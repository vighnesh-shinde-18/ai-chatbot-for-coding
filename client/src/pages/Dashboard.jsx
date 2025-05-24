import Sidebar from "@/components/Sidebar";
import HistoryDialog from "@/components/HistoryDialog";
import { useState } from "react";

const Dashboard = () => {
  const [historyOpen, setHistoryOpen] = useState(false); 

  return (
    <> 
      <div className="flex">
       <div className="sm:w-64 min-h-screen"> 
        <Sidebar 
          onHistoryClick={() => setHistoryOpen(true)}
          selectedFeature=""
          /></div>
        <main className="flex justify-center items-center flex-col w-full bg-white dark:bg-black text-black dark:text-white p-6">
          <h1 className="text-5xl text-center mt-7 sm:mt-0 font-bold">
            Welcome to Code Assistant
          </h1>
          <p className="text-muted-foreground mt-4 text-center text-xl">
            Choose a feature from the sidebar to get started.
          </p>
        </main>
      </div> 
    </>
  );
};

export default Dashboard;
