import React, { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const IMAGE_CONFIG = {
  MIN_WIDTH: 800,
  MIN_HEIGHT: 450,           // 16:9 at min width
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1080,
  MAX_FILE_SIZE_MB: 2,
  MAX_FILE_SIZE_BYTES: 2 * 1024 * 1024,
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
  OUTPUT_QUALITY: 0.82,      // JPEG quality after compression
  OUTPUT_MAX_WIDTH: 1280,    // Compress down to this max width
  OUTPUT_FORMAT: "image/webp", // Best size/quality ratio for web
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Validates image dimensions and file constraints.
 * Returns null if valid, or an error string.
 */
function validateImage(file, img) {
  if (!IMAGE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return `Unsupported format. Use JPEG, PNG, or WebP.`;
  }
  if (file.size > IMAGE_CONFIG.MAX_FILE_SIZE_BYTES) {
    return `File too large. Max size is ${IMAGE_CONFIG.MAX_FILE_SIZE_MB}MB.`;
  }
  if (img.width < IMAGE_CONFIG.MIN_WIDTH || img.height < IMAGE_CONFIG.MIN_HEIGHT) {
    return `Image too small. Minimum size is ${IMAGE_CONFIG.MIN_WIDTH}×${IMAGE_CONFIG.MIN_HEIGHT}px.`;
  }
  return null;
}

/**
 * Compresses and resizes an HTMLImageElement onto a canvas.
 * Returns a base64 WebP data URL.
 */
function compressImage(img) {
  const scale = Math.min(1, IMAGE_CONFIG.OUTPUT_MAX_WIDTH / img.width);
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL(IMAGE_CONFIG.OUTPUT_FORMAT, IMAGE_CONFIG.OUTPUT_QUALITY);
}

/**
 * Builds a lean image payload for storage.
 * Keeps only what's needed alongside the rest of post data.
 */
function buildImagePayload(file, base64, img) {
  const scale = Math.min(1, IMAGE_CONFIG.OUTPUT_MAX_WIDTH / img.width);
  return {
    data: base64,                          // compressed base64
    mimeType: IMAGE_CONFIG.OUTPUT_FORMAT,
    originalName: file.name,
    width: Math.round(img.width * scale),
    height: Math.round(img.height * scale),
    sizeKb: Math.round((base64.length * 0.75) / 1024), // approx decoded size
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ImageUploader({ formData, setFormData }) {
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const featuredImage = formData?.featuredImage ?? null;

  const processFile = useCallback(
    (file) => {
      if (!file) return;

      setStatus("uploading");
      setError(null);

      const objectUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        URL.revokeObjectURL(objectUrl); // free memory immediately

        const validationError = validateImage(file, img);
        if (validationError) {
          setError(validationError);
          setStatus("error");
          return;
        }

        try {
          const compressed = compressImage(img);
          const payload = buildImagePayload(file, compressed, img);

          // Store the optimized payload — not the raw file or a large blob URL
          setFormData((prev) => ({ ...prev, featuredImage: payload }));
          setStatus("success");
        } catch (err) {
          setError("Failed to process image. Please try again.");
          setStatus("error");
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setError("Could not read the image file.");
        setStatus("error");
      };

      img.src = objectUrl;
    },
    [setFormData]
  );

  const handleRemove = useCallback(
    (e) => {
      e.stopPropagation();
      setFormData((prev) => ({ ...prev, featuredImage: null }));
      setStatus("idle");
      setError(null);
      if (inputRef.current) inputRef.current.value = "";
    },
    [setFormData]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleClick = () => inputRef.current?.click();
  const handleChange = (e) => processFile(e.target.files?.[0]);

  // ── Render ──
  const borderColor = isDragging
    ? "border-teal-400"
    : status === "error"
    ? "border-red-400"
    : status === "success"
    ? "border-teal-500"
    : "border-gray-300";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Label */}
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
        Featured Image
      </label>
      <p className="text-xs text-gray-400 mb-3">
        Min {IMAGE_CONFIG.MIN_WIDTH}×{IMAGE_CONFIG.MIN_HEIGHT}px · Max{" "}
        {IMAGE_CONFIG.MAX_FILE_SIZE_MB}MB · JPEG / PNG / WebP · 16:9 recommended
      </p>

      {/* Drop Zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload featured image"
        className={`relative border-2 border-dashed ${borderColor} rounded-lg p-8 text-center
          transition-all duration-200 cursor-pointer
          hover:border-teal-400 hover:bg-teal-50/30
          focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2`}
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Remove button */}
        {featuredImage && (
          <button
            type="button"
            aria-label="Remove image"
            onClick={handleRemove}
            className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow
              hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* States */}
        {status === "uploading" ? (
          <UploadingState />
        ) : featuredImage ? (
          <PreviewState image={featuredImage} />
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Error / Success feedback */}
      {status === "error" && error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {status === "success" && featuredImage && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-teal-600">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>
            Uploaded · {featuredImage.width}×{featuredImage.height}px ·{" "}
            {featuredImage.sizeKb}KB
          </span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        id="fileInput"
        type="file"
        accept={IMAGE_CONFIG.ALLOWED_TYPES.join(",")}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <>
      <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
      <p className="text-sm font-medium text-gray-600 mb-1">
        Click to upload or drag & drop
      </p>
      <p className="text-xs text-gray-400">16:9 ratio recommended</p>
    </>
  );
}

function UploadingState() {
  return (
    <>
      <ImageIcon className="w-10 h-10 text-teal-400 mx-auto mb-3 animate-pulse" />
      <p className="text-sm text-teal-500 font-medium">Processing image…</p>
      <p className="text-xs text-gray-400 mt-1">Compressing & optimizing</p>
    </>
  );
}

function PreviewState({ image }) {
  return (
    <img
      src={image.data}
      alt="Featured image preview"
      className="mx-auto rounded-lg max-h-48 object-cover shadow-sm"
    />
  );
}