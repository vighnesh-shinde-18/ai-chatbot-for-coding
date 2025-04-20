import { useNavigate } from 'react-router-dom';
import FeaturesSection from '../components/FeaturesList';
import TechStackSection from '../components/TechStackSection';

export default function Hero() {
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
        navigate('/login');
    };
    
    const scrollToFeatures = () => {
        const el = document.getElementById('features');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    
    return (
        <div className="overflow-hidden bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="relative isolate px-6 pt-0 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-28 text-center">
                    <h1 className="text-5xl font-semibold text-gray-900 sm:text-6xl">
                        Your AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Code Assistant</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 sm:text-xl">
                        Debug, review, generate, and explain code instantly with intelligent AI.
                    </p>
                    
                    <div className="mt-8 flex items-center justify-center gap-x-6">
                        <button
                            onClick={handleGetStarted}
                            className="rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-indigo-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 hover:shadow-lg"
                        >
                            Get started
                        </button>
                        <button 
                            onClick={scrollToFeatures} 
                            className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
                        >
                            Learn more <span className="text-indigo-600">→</span>
                        </button>
                    </div>
                    
                    <div className="mt-10 space-y-16" id="features">
                        <FeaturesSection />
                        <TechStackSection />
                    </div>
                </div>
                
                {/* Second animated gradient background */}
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9089fc] to-[#80ffd9] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" 
                         style={{
                             clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                         }} />
                </div>
            </div>
        </div>
    );
}
