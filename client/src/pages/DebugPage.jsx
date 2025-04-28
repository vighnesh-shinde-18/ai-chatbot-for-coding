import { useState } from 'react';
import Navbar from '../components/NavBar';
import SelectedFeature from '../components/SelectedFeature';

export default function DebugPage() {
    const [code, setCode] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/ai/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ 
                    featureType: "codeDebugging",  // Updated featureType for Debugging
                    userInput: code 
                }),
            });

            if (!res.ok) {
                console.log(res);
                throw new Error('Unauthorized or Server Error');
            }
            console.log(res);

            const data = await res.json();
            let aiText = data?.data?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiText) {
                aiText = aiText.replace(/\*\*(.*?)\*\*/g, '$1');
                setResponse(aiText);
            } else {
                setResponse('No valid response from AI.');
            }

        } catch (error) {
            console.error(error);
            setResponse('Error communicating with backend.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <Navbar selected="Debug" />
        <SelectedFeature featureName="Debug" />
        <div className="max-w-4xl my-1 mx-auto p-4">
            <h1 className="text-xl font-semibold mb-4">Debug Code</h1>

            <textarea
                className="w-full p-2 border rounded-lg mb-4"
                rows={10}
                placeholder="Paste your code here"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-lg text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                disabled={loading}
            >
                {loading ? 'Debugging...' : 'Submit'}
            </button>

            <div className="mt-6">
                {loading && (
                    <div className="flex justify-center mt-6">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-solid"></div>
                    </div>
                )}
                {response && !loading && (
                    <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-red-700">AI Response:</h2>
                        <pre className="whitespace-pre-wrap">{response}</pre>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}
