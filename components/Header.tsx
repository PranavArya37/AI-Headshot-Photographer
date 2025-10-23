
import React from 'react';
import { CameraIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="inline-flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-lg">
          <CameraIcon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
            AI Headshot Photographer
          </h1>
          <p className="mt-2 text-md sm:text-lg text-gray-400">
            Transform your selfie into a professional headshot instantly.
          </p>
        </div>
      </div>
    </header>
  );
};
