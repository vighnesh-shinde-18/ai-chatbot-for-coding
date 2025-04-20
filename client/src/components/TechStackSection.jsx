const techStack = [
    {
        name: 'MongoDB',
        logo: 'https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg',
    },
    {
        name: 'Express.js',
        logo: 'https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg',
    },
    {
        name: 'React',
        logo: 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg',
    },
    {
        name: 'Node.js',
        logo: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg',
    },
    {
        name: 'Tailwind CSS',
        logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
    },
    {
        name: 'Gemini API',
        logo: 'https://avatars.githubusercontent.com/u/18060234?s=280&v=4', // Updated!
    },
    {
        name: 'HTML',
        logo: 'https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg',
    },
    {
        name: 'Vite',
        logo: 'https://vitejs.dev/logo-with-shadow.png',
    },
];


export default function TechStackSection() {
    return (
        <div className="mt-24 max-w-6xl mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
                Built with Modern & Powerful Technologies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
                {techStack.map((tech, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={tech.logo}
                            alt={tech.name}
                            className="h-14 w-14 object-contain mb-2"
                        />
                        <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
