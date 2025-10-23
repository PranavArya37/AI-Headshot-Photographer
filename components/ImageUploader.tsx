
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File, dataUrl: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        onImageUpload(file, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div 
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ease-in-out
          ${isDragging ? 'border-cyan-400 bg-cyan-900/20' : 'border-gray-600 hover:border-cyan-500'}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
        />
        {preview ? (
          <div className="relative group">
            <img src={preview} alt="Uploaded preview" className="w-full h-auto max-h-80 object-contain rounded-lg shadow-md" />
            <button onClick={onButtonClick} className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                Change Image
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-gray-400">
            <UploadIcon className="w-12 h-12 text-gray-500" />
            <p className="font-semibold">Drag & Drop your image here</p>
            <p className="text-sm">or</p>
            <button
              onClick={onButtonClick}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Browse Files
            </button>
            <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};
