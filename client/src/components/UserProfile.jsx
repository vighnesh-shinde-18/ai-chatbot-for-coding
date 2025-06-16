import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const FETCH_USER_URL = `${BASE_URL}/api/user/profile`;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(FETCH_USER_URL, {
          withCredentials: true, 
        });
        console.log(res)
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
 
      const timer = setTimeout(fetchUserProfile, 500);
  return () => clearTimeout(timer);
  }, []);

 

  
  return (
    <div className="flex items-center bg-white text-violet-700  space-x-4 p-2 border rounded-md border-gray-800">
      <Avatar>
        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username || "User"}`} />
        <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <div className="text-sm max-w-[150px]">
        <p className="font-medium truncate">{user?.username || "Username"}</p>
        <p className="text-gray-500 truncate whitespace-nowrap overflow-hidden">{user?.email || "user@example.com"}</p>
      </div>
    </div>
  );
};

export default UserProfile;
