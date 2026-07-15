// src/components/studio/projects/ImageUpload.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import ImageCropModal from "./ImageCropModal";

interface ImageUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  existingImageUrl?: string | null;
  onExistingImageRemove?: () => void;
}

export default function ImageUpload({
  value,
  onChange,
  existingImageUrl,
  onExistingImageRemove,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setCropSrc(url);
  }, []);

  const handleCropComplete = useCallback(
    (croppedFile: File) => {
      if (preview) URL.revokeObjectURL(preview);
      if (cropSrc) URL.revokeObjectURL(cropSrc);
      const url = URL.createObjectURL(croppedFile);
      setPreview(url);
      onChange(croppedFile);
      setCropSrc(null);
    },
    [preview, cropSrc, onChange],
  );

  const handleCropClose = useCallback(() => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    if (inputRef.current) inputRef.current.value = "";
  }, [cropSrc]);

  const handleRemoveNew = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  // Determine what to show
  const displayUrl = preview ?? existingImageUrl ?? null;
  const isExisting = !preview && !!existingImageUrl;

  return (
    <>
      <div className="w-full">
        {displayUrl ? (
          <div className="relative w-full aspect-square max-w-xs mx-auto rounded-xl overflow-hidden">
            <Image
              src={displayUrl}
              alt="Cover preview"
              fill
              className="object-cover"
            />
            {/* Label for existing image */}
            {isExisting && (
              <div
                className="absolute bottom-2 left-2 px-2 py-1 rounded text-[10px] text-[#E8E8E8]/70"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "rgba(0,0,0,0.6)",
                }}
              >
                Current image
              </div>
            )}
            <button
              type="button"
              onClick={isExisting ? onExistingImageRemove : handleRemoveNew}
              className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-[#0D1117]/80 text-[#E8E8E8] hover:bg-[#0D1117] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className="w-full aspect-square max-w-xs mx-auto rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors duration-200"
            style={{
              border: `2px dashed ${isDragging ? "#C9A84C" : "rgba(232,232,232,0.12)"}`,
              backgroundColor: isDragging
                ? "rgba(201,168,76,0.05)"
                : "rgba(255,255,255,0.02)",
            }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full"
              style={{ backgroundColor: "rgba(232,232,232,0.06)" }}
            >
              <ImageIcon size={22} className="text-[#E8E8E8]/30" />
            </div>
            <div className="text-center px-4">
              <p
                className="text-sm text-[#E8E8E8]/60 mb-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Drag & drop, or{" "}
                <span className="text-[#C9A84C]">click to select</span>
              </p>
              <p
                className="text-xs text-[#E8E8E8]/30"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                JPG, PNG, WebP — will be cropped to 1:1
              </p>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>

      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          onCropComplete={handleCropComplete}
          onClose={handleCropClose}
        />
      )}
    </>
  );
}
