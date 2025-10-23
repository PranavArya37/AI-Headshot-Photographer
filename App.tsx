
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { Spinner } from './components/Spinner';
import { GeneratedImage } from './components/GeneratedImage';
import { generateHeadshot } from './services/geminiService';
import { HEADSHOT_STYLES } from './constants';
import type { HeadshotStyle } from './types';
import { CameraIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<{ file: File; dataUrl: string } | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File, dataUrl: string) => {
    setUploadedImage({ file, dataUrl });
    setGeneratedImage(null);
    setError(null);
  }, []);

  const handleStyleSelect = useCallback((style: HeadshotStyle) => {
    setSelectedStyle(style);
    setError(null);
  }, []);
  
  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyle) {
      setError('Please upload an image and select a style first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateHeadshot(uploadedImage.file, selectedStyle.prompt);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isGenerateDisabled = !uploadedImage || !selectedStyle || isLoading;

  return (
    <div className="min-h-screen bg-gray-900 font-sans antialiased flex flex-col">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16 flex-grow">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 md:gap-12">
          
          <div className="p-8 bg-white/5 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-cyan-300 mb-2 flex items-center justify-center gap-2">
              <CameraIcon className="w-6 h-6" />
              Step 1: Upload Your Selfie
            </h2>
            <p className="text-center text-gray-400 mb-6">Choose a clear, front-facing photo for the best results.</p>
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>

          {uploadedImage && (
            <div className="p-8 bg-white/5 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-center text-cyan-300 mb-2 flex items-center justify-center gap-2">
                <SparklesIcon className="w-6 h-6" />
                Step 2: Choose Your Style
              </h2>
              <p className="text-center text-gray-400 mb-6">Select the aesthetic for your new professional headshot.</p>
              <StyleSelector
                styles={HEADSHOT_STYLES}
                selectedStyle={selectedStyle}
                onStyleSelect={handleStyleSelect}
              />
            </div>
          )}

          <div className="flex flex-col items-center justify-center gap-6">
            <button
              onClick={handleGenerate}
              disabled={isGenerateDisabled}
              className={`
                inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300
                ${isGenerateDisabled
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1'
                }
              `}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-6 h-6" />
                  Generate My Headshot
                </>
              )}
            </button>
            {error && <p className="text-red-400 text-center mt-4">{error}</p>}
          </div>
          
          {(isLoading || generatedImage) && (
            <div className="p-8 bg-white/5 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/10">
               <h2 className="text-xl sm:text-2xl font-bold text-center text-cyan-300 mb-6">Your AI Generated Headshot</h2>
              {isLoading && !generatedImage && (
                <div className="flex flex-col items-center justify-center h-64">
                  <Spinner size="lg" />
                  <p className="mt-4 text-gray-300 animate-pulse">Creating your professional look... this may take a moment.</p>
                </div>
              )}
              {generatedImage && <GeneratedImage src={generatedImage} />}
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 px-4 border-t border-white/10">
        <p className="text-sm text-gray-500">
          &copy; 2025 AI Headshot Photographer - <a href="https://pranavarya.in" target="_blank"
          rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">Pranav Arya</a>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
