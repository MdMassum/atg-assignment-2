import logo from '../assets/logo.png'

export default function Footer() {
    return (
      <footer className="flex justify-between items-center py-4 md:px-16 px-4 bg-gray-100 shadow-lg text-gray-700">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-4" />
        </div>
        <p className="text-sm flex">&copy; {new Date().getFullYear()} Across The Globe. <span className='hidden md:flex'>All rights reserved.</span></p>
      </footer>
    );
  }
  