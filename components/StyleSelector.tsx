
import React from 'react';
import type { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  styles: HeadshotStyle[];
  selectedStyle: HeadshotStyle | null;
  onStyleSelect: (style: HeadshotStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onStyleSelect(style)}
          className={`
            relative block w-full aspect-w-1 aspect-h-1 rounded-xl overflow-hidden group transition-all duration-300
            transform hover:scale-105 focus:outline-none focus:ring-4
            ${selectedStyle?.id === style.id ? 'ring-4 ring-cyan-400 shadow-lg shadow-cyan-500/30' : 'ring-2 ring-transparent hover:ring-cyan-500'}
          `}
        >
          <img src={style.thumbnailUrl} alt={style.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-3 sm:p-4 text-left">
            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{style.name}</h3>
          </div>
          {selectedStyle?.id === style.id && (
            <div className="absolute top-2 right-2 p-1 bg-cyan-400 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
