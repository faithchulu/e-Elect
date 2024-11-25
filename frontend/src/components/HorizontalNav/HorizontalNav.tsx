"use client"
import Image from "next/image";
import Logo from '../../../public/images/logo/e-Elect-Logo.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HorizontalNav = () => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
  ];

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
            <Link href="/"><span className="ml-2 text-xl font-bold">e-Elect</span></Link>
            <p className="text-blue-300 text-sm"> Revolutionizing Voting in Zambia!</p>
          </div>
        </div>
        
        {/* Navigation items */}
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={`hover:text-gray-300 ${currentPath === item.href ? 'text-blue-400 font-bold' : ''}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default HorizontalNav;
