import Image from "next/image";
import Logo from '../../../public/images/logo/e-Elect-Logo.png'

const HorizontalNav= () => {
  return (
    <nav className="bg-slate-950 bg-opacity-90 text-white fixed top-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={Logo}
            alt="Logo"
            className="h-16 w-auto"
          />
          <div>
            <span className="ml-2 text-xl font-bold">e-Elect</span>
            <p className="text-blue-300 text-sm"> Revolutionizing Voting in Zambia!</p>
          </div>
        </div>
        
        {/* Navigation items */}
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="/active-elections" className="hover:text-gray-300">Active Elections</a>
          </li>
          <li>
            <a href="/closed-elections" className="hover:text-gray-300">Closed Elections</a>
          </li>
          <li>
            <a href="Info" className="hover:text-gray-300">Info</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HorizontalNav;
