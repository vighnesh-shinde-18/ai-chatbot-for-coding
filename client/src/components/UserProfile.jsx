import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          withCredentials: true, // Important to send the token from cookies
        });
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex items-center space-x-4 p-2 border rounded-md border-gray-800">
      <Avatar>
        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username || "User"}`} />
        <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <div className="text-sm max-w-[150px]">
        <p className="font-medium truncate">{user?.username || "Username"}</p>
        <p className="text-gray-400 truncate whitespace-nowrap overflow-hidden">{user?.email || "user@example.com"}</p>
      </div>
    </div>
  );
};

export default UserProfile;
