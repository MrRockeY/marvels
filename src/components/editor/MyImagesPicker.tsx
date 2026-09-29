"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { useWorksheetStore } from "@/store/worksheetStore";
import { addUploadedImage, deleteUploadedImage, listUploadedImages } from "@/lib/storage";
import type { UploadedImage } from "@/types/worksheet";
import { CopiesStepper } from "@/components/editor/CopiesStepper";
import { Button } from "@/components/ui/button";

export function MyImagesPicker() {
  const addItems = useWorksheetStore((s) => s.addItems);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [copies, setCopies] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImages(listUploadedImages());
  }, []);

  const handleUpload = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const image = addUploadedImage(file.name.replace(/\.[^.]+$/, ""), dataUrl);
        setImages((prev) => [image, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (id: string) => {
    deleteUploadedImage(id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleAdd = (image: UploadedImage) => {
    addItems(
      Array.from({ length: copies }, () => ({
        category: "image" as const,
        value: image.id,
        label: image.name,
        imageSrc: image.dataUrl,
      })),
    );
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg"
        multiple
        className="hidden"
        onChange={(e) => handleUpload(e.target.files)}
      />
      <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} className="w-full">
        <ImagePlus className="h-4 w-4" />
        Upload PNG / JPG
      </Button>

      <div className="flex items-center justify-between">
        <CopiesStepper value={copies} onChange={setCopies} />
      </div>

      {images.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[#e4d6c3] bg-white/60 py-6 text-center text-xs text-[#a3947c]">
          No images uploaded yet. Uploaded images stay on this device.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative flex flex-col items-center gap-1.5 rounded-xl border border-[#e4d6c3] bg-white p-2"
            >
              <button
                onClick={() => handleAdd(image)}
                className="flex h-14 w-full items-center justify-center overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
                aria-label={`Add ${image.name}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.dataUrl} alt={image.name} className="h-full w-full object-contain" />
              </button>
              <span className="w-full truncate text-center text-[10px] text-[#5c4d3c]">{image.name}</span>
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#b03a2e] opacity-0 shadow ring-1 ring-[#e4d6c3] transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                aria-label={`Delete ${image.name}`}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
