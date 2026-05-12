"use server";

import { cloudinary } from "@/lib/cloudinary";

export async function uploadImageAction(
  formData: FormData
) {
  const file =
    formData.get(
      "file"
    ) as File;

  if (!file) {
    throw new Error(
      "No file uploaded"
    );
  }

  const bytes =
    await file.arrayBuffer();

  const buffer =
    Buffer.from(bytes);

  const result =
    await new Promise<{
      secure_url: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder:
              "hypercode-store",
          },

          (
            error,
            result
          ) => {
            if (
              error ||
              !result
            ) {
              reject(error);

              return;
            }

            resolve(result);
          }
        )
        .end(buffer);
    });

  return {
    success: true,

    imageUrl:
      result.secure_url,
  };
}