// src/components/studio/projects/ImageCropModal.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { X, Check } from "lucide-react";

interface ImageCropModalProps {
  imageSrc: string;
  onCropComplete: (croppedFile: File) => void;
  onClose: () => void;
}

// Helper — creates initial centered 1:1 crop
function centerAspectCrop(mediaWidth: number, mediaHeight: number): Crop {
  return centerCrop(
    makeAspectCrop(
      { unit: "%", width: 90 },
      1, // 1:1 aspect ratio
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

// Helper — converts crop to a File using canvas
async function getCroppedFile(
  image: HTMLImageElement,
  crop: PixelCrop,
  fileName: string,
): Promise<File> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(new File([blob], fileName, { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.92,
    );
  });
}

export default function ImageCropModal({
  imageSrc,
  onCropComplete,
  onClose,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height));
    },
    [],
  );

  const handleApply = async () => {
    if (!imgRef.current || !completedCrop) return;

    try {
      const file = await getCroppedFile(
        imgRef.current,
        completedCrop,
        `cropped-${Date.now()}.jpg`,
      );
      onCropComplete(file);
    } catch (err) {
      console.error("Crop failed:", err);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-99998 bg-[#0D1117]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 z-99999 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 flex flex-col gap-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,18,30,0.95) 0%, rgba(8,18,29,0.95) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(232,232,232,0.10)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3
              className="text-lg font-light text-[#E8E8E8]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Crop Image
            </h3>
            <p
              className="text-xs text-[#E8E8E8]/40"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Drag to adjust. Aspect ratio is locked to 1:1.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#E8E8E8]/40 hover:text-[#E8E8E8] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Crop area */}
        <div
          className="flex items-center justify-center rounded-xl overflow-hidden"
          style={{ backgroundColor: "#060E18", maxHeight: "60vh" }}
        >
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            minWidth={100}
            minHeight={100}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop preview"
              onLoad={onImageLoad}
              style={{
                maxHeight: "60vh",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </ReactCrop>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm text-[#E8E8E8]/50 hover:text-[#E8E8E8] transition-colors cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)",
              border: "1px solid rgba(232,232,232,0.12)",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!completedCrop}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm text-[#E8E8E8] transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)",
              background:
                "linear-gradient(135deg, #8D6C3C 0%, #725F45 55%, #8D6C3C 100%)",
              boxShadow: "0 4px 20px rgba(141,108,60,0.3)",
            }}
          >
            <Check size={16} />
            Apply Crop
          </button>
        </div>
      </div>
    </>
  );
}
