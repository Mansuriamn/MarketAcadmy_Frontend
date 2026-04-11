import React, { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, AlertCircle } from "lucide-react";

const IMAGE_CONFIG = {
  MIN_WIDTH: 800,
  MIN_HEIGHT: 450,
  MAX_FILE_SIZE_MB: 5,
  MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024,
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
};

function validateImage(file, img) {
  if (!IMAGE_CONFIG.ALLOWED_TYPES.includes(file.type))
    return "Unsupported format. Use JPEG, PNG, or WebP.";
  if (file.size > IMAGE_CONFIG.MAX_FILE_SIZE_BYTES)
    return `File too large. Max size is ${IMAGE_CONFIG.MAX_FILE_SIZE_MB}MB.`;
  if (img.width < IMAGE_CONFIG.MIN_WIDTH || img.height < IMAGE_CONFIG.MIN_HEIGHT)
    return `Image too small. Minimum ${IMAGE_CONFIG.MIN_WIDTH}×${IMAGE_CONFIG.MIN_HEIGHT}px.`;
  return null;
}

export default function ImageUploader({ onImageSelect, onImageRemove }) {
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const processFile = useCallback((file) => {
    if (!file) return;
    setError(null);

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const validationError = validateImage(file, img);
      if (validationError) {
        URL.revokeObjectURL(objectUrl);
        setError(validationError);
        return;
      }
      setPreview(objectUrl);
      onImageSelect(file); // Pass the raw file to NewsPost
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      setError("Could not read the image file.");
    };

    img.src = objectUrl;
  }, [onImageSelect]);

  const handleRemove = useCallback((e) => {
    e.stopPropagation();
    setPreview(null);
    setError(null);
    onImageRemove(); // Tell parent image is gone
    if (inputRef.current) inputRef.current.value = "";
  }, [onImageRemove]);

  const borderColor = isDragging ? "border-teal-400" : error ? "border-red-400" : "border-gray-300";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
        Featured Image
      </label>
      <p className="text-xs text-gray-400 mb-3">
        Min {IMAGE_CONFIG.MIN_WIDTH}×{IMAGE_CONFIG.MIN_HEIGHT}px · Max {IMAGE_CONFIG.MAX_FILE_SIZE_MB}MB
      </p>

      <div
        role="button"
        tabIndex={0}
        className={`relative border-2 border-dashed ${borderColor} rounded-lg p-8 text-center transition-all duration-200 cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 focus:outline-none`}
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files[0]); }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
      >
        {preview && (
          <button type="button" onClick={handleRemove} className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow hover:text-red-500">
            <X className="w-4 h-4" />
          </button>
        )}

        {preview ? (
          <img src={preview}  className="mx-auto rounded-lg max-h-48 object-cover shadow-sm" />
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-600 mb-1">Click to upload or drag & drop</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <input ref={inputRef} type="file" className="hidden" accept="image/*" onChange={(e) => processFile(e.target.files?.[0])} />
    </div>
  );
}