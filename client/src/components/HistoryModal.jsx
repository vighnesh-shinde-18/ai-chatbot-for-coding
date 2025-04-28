import { useState, useEffect } from 'react';
import axios from 'axios';
import HistoryFilterDropdown from './HistoryFilterDropdown';
import HistoryList from './HistoryList';

export default function HistoryModal({ isOpen, onClose }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [historyData, setHistoryData] = useState({
    All: [],
    Debug: [],
    Generate: [],
    Explain: [],
    Review: [],
    Convert: [],
    TestCases: []
  });
  const [filteredHistory, setFilteredHistory] = useState([]);

  // Fetch history data when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/user/conversations", { 
            withCredentials: true 
          });
          
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
              const historyItem = {
                ...conversation,
                _id: conversation._id || Date.now().toString() // Ensure each item has a unique ID
              };

              newHistory.All.push(historyItem);

              switch (conversation.featureType) {
                case 'codeDebugging':
                  newHistory.Debug.push(historyItem);
                  break;
                case 'codeGeneration':
                  newHistory.Generate.push(historyItem);
                  break;
                case 'explainCode':
                  newHistory.Explain.push(historyItem);
                  break;
                case 'codeReview':
                  newHistory.Review.push(historyItem);
                  break;
                case 'convertCode':
                  newHistory.Convert.push(historyItem);
                  break;
                case 'generateTestCases':
                  newHistory.TestCases.push(historyItem);
                  break;
                default:
                  break;
              }
            });

            setHistoryData(newHistory);
          }
        } catch (error) {
          console.error("Error fetching history:", error);
        }
      };

      fetchHistory();
    }
  }, [isOpen]);
 
  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredHistory(historyData.All || []);
    } else {
      setFilteredHistory(historyData[selectedFilter] || []);
    }
  }, [selectedFilter, historyData]);

  const handleDelete = async (itemToDelete) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/conversations/:${itemToDelete._id}`, {
        withCredentials: true
      });
      
      coms 
      // Update local state
      setHistoryData(prev => {
        const updated = {...prev};
        Object.keys(updated).forEach(key => {
          updated[key] = updated[key].filter(item => item._id !== itemToDelete._id);
        });
        return updated;
      });
    } catch (error) {
      console.error("Error deleting history item:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Modal panel */}
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-2xl">
          {/* Modal header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Chat History
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-3">
              <HistoryFilterDropdown 
                options={Object.keys(historyData)} 
                selected={selectedFilter}
                onSelect={setSelectedFilter}
              />
            </div>
          </div>
          
          <div className="bg-white px-4 py-2 sm:p-4 min-h-[60vh] overflow-y-auto">
            <HistoryList 
              items={filteredHistory}
              onDelete={handleDelete}
            />
          </div>
          
          {/* Modal footer */}
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}