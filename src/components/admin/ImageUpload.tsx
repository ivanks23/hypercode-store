"use client";

import Image from "next/image";

import {
  useRef,
  useState,
  useTransition,
} from "react";

import { Upload } from "lucide-react";
import { uploadImageAction } from "@/actions/admin/upload-image";

type Props = {
  value?: string;

  onChange: (
    url: string
  ) => void;
};

export function ImageUpload({
  value,
  onChange,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const [
    preview,
    setPreview,
  ] = useState(value || "");

  const [
    isPending,
    startTransition,
  ] = useTransition();

  async function handleFile(
    file: File
  ) {
    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    startTransition(async () => {
      const result =
        await uploadImageAction(
          formData
        );

      if (
        result.success
      ) {
        setPreview(
          result.imageUrl
        );

        onChange(
          result.imageUrl
        );
      }
    });
  }

  return (
    <div>
      {/* PREVIEW */}

      {preview && (
        <div className="mb-4 overflow-hidden rounded-3xl border">
          <Image
            src={preview}
            alt="Preview"
            width={800}
            height={800}
            className="h-64 w-full object-cover"
          />
        </div>
      )}

      {/* UPLOAD */}

      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          inputRef.current?.click()
        }
        className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed bg-muted/20 px-6 py-12 transition hover:bg-muted"
      >
        <Upload className="h-8 w-8 text-violet-600" />

        <div className="text-center">
          <p className="font-semibold">
            {isPending
              ? "Uploading..."
              : "Upload image"}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            PNG, JPG or WEBP
          </p>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file =
            e.target
              .files?.[0];

          if (file) {
            handleFile(
              file
            );
          }
        }}
      />
    </div>
  );
}