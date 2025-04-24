import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [selectedType, setSelectedType] = useState('All');

  const [userObj, setUserObj] = useState({});

  const [allHistory, setAllHistory] = useState({
    All: [],
    Debug: [],
    Generate: [],
    Explain: [],
    Review: [],
    Convert: [],
    TestCases: []
  });


  const [history, setHistory] = useState({});

  // All: ['Debugged bug #123', 'Generated login form', 'Explained recursion'],
  // Debug: ['Debugged bug #123', 'Fixed null pointer'],
  // Generate: ['Generated login form', 'Created navbar layout'],
  // Explain: ['Explained recursion', 'Explained promises'],

  const handleDeleteItem = (item) => {
    setHistory((prev) => ({
      ...prev,
      [selectedType]: prev[selectedType].filter((entry) => entry !== item),
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/profile", { withCredentials: true })
      .then((response) => {
        setUserObj(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/user/conversations", { withCredentials: true })
      .then((response) => {
        if (response.data.conversations) {
          const newHistory = {
            All: [],
            Debug: [],
            Generate: [],
            Explain: [],
            Review: [],
            Convert: [],
            TestCases: []
          };

          response.data.conversations.forEach((conversation) => {

            newHistory.All.push(conversation.userInput);

            switch (conversation.featureType) {
              case 'codeDebugging':
                newHistory.Debug.push(conversation.userInput);
                break;
              case 'codeGeneration':
                newHistory.Generate.push(conversation.userInput);
                break;
              case 'explainCode':
                newHistory.Explain.push(conversation.userInput);
                break;
              case 'codeReview':
                newHistory.Review.push(conversation.userInput);
                break;
              case 'convertCode':
                newHistory.Convert.push(conversation.userInput);
                break;
              case 'generateTestCases':
                newHistory.TestCases.push(conversation.userInput);
                break;
              default:
                break;
            }
          });

          console.log("Fetched Conversations:", response.data.conversations);
          console.log("Processed History:", newHistory);

          setAllHistory(newHistory);
          setHistory(newHistory);
        }
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });
  }, []);

  const navigate = useNavigate()
  const logOut = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      if (response.status === 200) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteAll = () => {
    setHistory((prev) => ({
      ...prev,
      [selectedType]: [],
    }));
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => {
          setShowMenu(!showMenu);
          setIsOpen(!isOpen);
        }}
        className={`fixed top-20 left-56 z-50 rounded-md bg-indigo-600 text-white p-2 hover:bg-indigo-700 transform ${isOpen ? 'translate-x-0' : '-translate-x-52'
          } transition-transform duration-300`}
      >
        {showMenu ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-full w-72 bg-gradient-to-b  from-violet-200 to-pink-200 shadow-xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 z-40`}
      >
        <div className="flex flex-col h-full px-4 py-6 relative">
          <h2 className="text-xl font-bold mb-6 text-gray-900">History Filter</h2>
 
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mb-4 rounded-md border-gray-900 px-3 py-2 shadow-lg text-sm  text-gray-800"
          >
            {Object.keys(allHistory).map((type) => (
              <option key={type} value={type} >
                {type}
              </option>
            ))}
          </select>

          {/* Scrollable History */}
          <div className="flex-1 overflow-y-auto space-y-3 pb-24">
            {history[selectedType]?.length > 0 ? (
              history[selectedType].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white rounded-md p-2 shadow-sm text-sm text-gray-800"
                >
                  <span>{item}</span>
                  <button onClick={() => handleDeleteItem(item)} title="Delete item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500 hover:text-red-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No history available.</p>
            )}
          </div>

          <div className="mb-32 mt-5 ml-16 mr-8">
            <button
              onClick={handleDeleteAll}
              className="rounded-md bg-red-500 px-6 py-2 text-white text-sm font-medium shadow-md hover:bg-red-600 transition"
            >
              Delete All
            </button>
            <div onClick={logOut} className="items-center mx-3 mt-2 space-x-4 flex-column sm:hidden flex cursor-pointer">
              <span className="text-lg text-blue-500 font-medium">Logout</span>
              <img src="/src/assets/logo/log-out.png" alt="Logout" className='size-7 text-sm text-white' />
            </div>
          </div>

          <div className="flex flex-row justify-center mb-14 px-3 pt-2 bg-white rounded-md shadow-sm box-border">
            <div className="w-10 h-10 mb-2 mx-2 bg-indigo-500 text-white flex items-center justify-center rounded-full font-semibold text-sm uppercase">
              {userObj?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{userObj.username}</p>
              <p className="text-xs text-gray-500">{userObj.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
