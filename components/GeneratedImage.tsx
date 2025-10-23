
import React from 'react';
import { DownloadIcon } from './Icons';

interface GeneratedImageProps {
  src: string;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ src }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'ai-headshot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative group w-full max-w-md">
        <img src={src} alt="AI Generated Headshot" className="rounded-xl shadow-2xl w-full" />
      </div>
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
      >
        <DownloadIcon className="w-5 h-5" />
        Download Image
      </button>
    </div>
  );
};
