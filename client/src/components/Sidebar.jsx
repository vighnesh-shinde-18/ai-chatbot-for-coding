import {
  Menu,
  History,
  LogOut,
  Bot,
  BugPlay,
  FileText,
  FileCode,
  FileSearch,
  FileInput,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfile from "./UserProfile";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const features = [
  { name: "Debug", icon: BugPlay, path: "/debug" },
  { name: "Review", icon: FileSearch, path: "/review" },
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



const Sidebar = ({ onHistoryClick, selectedFeature, isLoggedIn }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const logOutUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
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
      console.error("Logout error:", error);
      toast.error("Something went wrong");
    }
  };

  const exitUser = async () => {
    navigate("/login");
  };


  return (
    <>
      {/* Sidebar Toggle Button (Mobile only) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          className={`bg-gray-900 text-white p-2 rounded-md shadow-md transition-all duration-300 ease-in-out 
            ${isSidebarOpen ? "translate-x-48" : "translate-x-0 overflow-hidden"}`}
        >
          {isSidebarOpen ? <X className="w-8 h-8" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      <div
        className={`bg-gray-900 text-white h-screen flex flex-col justify-between transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"} 
          md:w-64 fixed md:static z-40`}
      >
        <div>
          <h2 className="text-2xl font-bold p-4">Code Assistant</h2>
          <nav className="space-y-1 px-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isSelected = typeToName[selectedFeature] === feature.name;
              return (
                <Link
                  key={feature.name}
                  to={feature.path}
                  className={`flex items-center space-x-2 rounded-md px-3 py-2 transition ${isSelected ? "bg-blue-400" : "hover:bg-gray-800"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{feature.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {isLoggedIn ? (<div className="px-4 py-4 space-y-3">
          <UserProfile />
          <Button variant="ghost" onClick={onHistoryClick} className="w-full">
            <History className="mr-2 h-4 w-4" /> History
          </Button>
          <Button onClick={logOutUser} variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>) : (<div className="px-4 py-4 space-y-3">
          <Button onClick={logOutUser} variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Exit
          </Button>
        </div>)}

        {/* <Button onClick={exitUser} variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Exit
          </Button> */}

      </div>
    </>
  );
};

export default Sidebar;
