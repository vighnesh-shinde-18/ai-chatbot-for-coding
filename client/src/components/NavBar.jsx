import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const navigation = [
  { name: 'Debug', href: '#' },
  { name: 'Review', href: '#' },
  { name: 'Generate', href: '#' },
  { name: 'Explain', href: '#' },
  { name: 'Convert', href: '#' },
  { name: 'TestCases', href: '#' },
]

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
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

  return (
    <nav className="bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center size-40">
            <img
              className="size-32"
              src="/src/assets/logo/logo.png"
              alt="Logo"
            />
          </div>

          <div className="hidden md:flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gradient-to-r from-indigo-600 to-purple-600 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="md:hidden relative mr-0">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 shadow-md focus:outline-none"
            >
              Features
              <svg
                className={`ml-2 h-4 w-4 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 cursor-pointer"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div onClick={logOut} className="items-center space-x-4 flex-column hidden sm:flex cursor-pointer">
            <span className="text-lg text-blue-500 font-medium">Logout</span>
            <img src="/src/assets/logo/log-out.png" alt="Logout" className='size-8 text-sm text-white' />
          </div>
        </div>
      </div>
    </nav>
  )
}
