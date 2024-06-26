import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClockIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import HorizontalNav from '@/components/HorizontalNav/HorizontalNav';
import Logo from '../../public/images/logo/e-Elect-Logo.png';
import HomeBG from '../../public/images/backgrounds/zambia_flag.png';

interface Election {
  id: number;
  name: string;
  status: 'registration' | 'voting' | 'closed';
}

// Mock data for currently active and historical elections
const activeElections: Election[] = [
  { id: 1, name: '2024 Presidential Election', status: 'registration' },
  { id: 2, name: '2024 Congressional Election', status: 'voting' },
];

const historicalElections: Election[] = [
  { id: 3, name: '2023 Local Election', status: 'closed' },
];

const ElectionCard = ({ election }: { election: Election }) => {
  const getStatusIcon = (status: Election['status']) => {
    switch (status) {
      case 'registration':
        return <ClockIcon className="w-6 h-6 text-orange-500" />;
      case 'voting':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'closed':
        return <ExclamationCircleIcon className="w-6 h-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Election['status']) => {
    switch (status) {
      case 'registration':
        return 'Registration Open';
      case 'voting':
        return 'Voting in Progress';
      case 'closed':
        return 'Election Closed';
      default:
        return null;
    }
  };

  const getActionText = (status: Election['status']) => {
    switch (status) {
      case 'registration':
        return 'Register to Vote';
      case 'voting':
        return 'Cast Your Vote';
      case 'closed':
        return 'View Results';
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-slate-950 shadow-lg rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{election.name}</h2>
        {getStatusIcon(election.status)}
      </div>
      <p className="mt-2 text-gray-300">{getStatusText(election.status)}</p>
      <Link href={election.status === 'registration' ? '/voter-registration/2345' : election.status === 'voting' ? '/cast-vote/37848dhhd8' : '/results/37848dhhd8'} className="mt-4 block w-full text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-500">
        {getActionText(election.status)}
      </Link>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <Image
          src={HomeBG}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="relative z-10 min-h-screen py-24">
        <HorizontalNav />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-white">Currently Active Elections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeElections.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
          <h2 className="text-xl font-semibold mt-8 mb-4 text-white">Historical Elections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {historicalElections.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
