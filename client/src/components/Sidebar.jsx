import {
  Menu, History, LogOut, Bot, BugPlay, FileText,
  FileCode, FileSearch, FileInput, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfile from "./UserProfile";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HistoryDialog from "./HistoryDialog";
import { Card } from "@/components/ui/card";

const features = [
  { name: "Debug", icon: BugPlay, path: "/debug" },
  { name: "Review & Optimize", icon: FileSearch, path: "/review" },
  { name: "Generate", icon: Bot, path: "/generate" },
  { name: "Convert", icon: FileCode, path: "/convert" },
  { name: "Explain", icon: FileText, path: "/explain" },
  { name: "TestCases", icon: FileInput, path: "/testcases" },
];

const typeToName = {
  codeDebugging: "Debug",
  codeReview: "Review",
  codeGeneration: "Generate",
  explainCode: "Explain",
  convertCode: "Convert",
  generateTestCases: "TestCases",
};

const Sidebar = ({ setSelectedFeature, selectedFeature }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const LOGOUT_USER_URL = `${BASE_URL}/api/auth/logout`;

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const logOutUser = async () => {
    try {
      const response = await fetch(LOGOUT_USER_URL, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Logged out successfully");
        navigate("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <> 
     <div
  className={`fixed top-4 z-50 transition-all duration-300 md:hidden ${
    isSidebarOpen ? "left-64" : "left-4"
  }`}
>
  <Button
    variant="ghost"
    onClick={toggleSidebar}
    className="bg-violet-800 text-white p-2 rounded-md shadow"
  >
    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
  </Button>
</div>


      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"} md:static md:w-64`}
      >
        <Card className="h-full flex flex-col justify-between bg-violet-700 text-white shadow-lg">
          {/* Logo Section */}
          <div className="px-6 py-6 border-b border-violet-600">
            <h1 className="text-2xl font-extrabold tracking-tight">DSA Buddy</h1>
            <p className="text-sm text-violet-200">Your AI DSA Assistant</p>
          </div>

          {/* Feature Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {features.map(({ name, icon: Icon, path }) => {
              const isSelected = typeToName[selectedFeature] === name || location.pathname === path;
              return (
                <Link
  key={name}
  to={path}
  className={`group flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition relative
    ${isSelected
      ? "bg-white text-violet-700"
      : "text-white hover:bg-white hover:text-violet-700"}`}
>
  <Icon className="w-5 h-5" />
  {isSidebarOpen && <span>{name}</span>}
  {!isSidebarOpen && (
    <span className="absolute left-12 whitespace-nowrap z-50 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
      {name}
    </span>
  )}
</Link>

              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="px-4 py-4 border-t border-violet-600 space-y-3">
            <UserProfile />

            <Button
              variant="ghost"
              onClick={() => {
                setShowHistory(true);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className="w-full justify-center text-white hover:bg-white "
            >
              <History className="mr-2 h-4 w-4 " />
              History
            </Button>
            <Button
              onClick={logOutUser}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </Card>
      </div>

      {/* History Dialog */}
      {showHistory && (
        <HistoryDialog
          open={showHistory}
          setOpen={setShowHistory}
          setSelectedFeature={setSelectedFeature}
        />
      )}
    </>
  );
};

export default Sidebar;
