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
            <a href="/"><span className="ml-2 text-xl font-bold">e-Elect</span></a>
            <p className="text-blue-300 text-sm"> Revolutionizing Voting in Zambia!</p>
          </div>
        </div>
        
        {/* Navigation items */}
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="/cast-vote/37848dhhd8" className="hover:text-gray-300">Cast Vote</a>
          </li>
          <li>
            <a href="/voter-registration/2345" className="hover:text-gray-300">Register</a>
          </li>
          <li>
            <a href="/results/2456" className="hover:text-gray-300">Results</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HorizontalNav;
