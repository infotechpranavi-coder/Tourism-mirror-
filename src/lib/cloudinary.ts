import { v2 as cloudinary } from 'cloudinary';
import { Buffer } from 'node:buffer';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

function canUploadToCloudinary() {
  return Boolean(cloudName && apiKey && apiSecret);
}

function isDataUri(value: string) {
  return /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(value);
}

export async function uploadImageIfNeeded(image?: string, folder = 'bhoomi/posts') {
  if (!image) {
    return image;
  }

  if (!isDataUri(image)) {
    return image;
  }

  if (!canUploadToCloudinary()) {
    throw new Error('Cloudinary environment variables are missing.');
  }

  const result = await cloudinary.uploader.upload(image, {
    folder,
    resource_type: 'image',
  });

  return result.secure_url;
}

export async function uploadImagesIfNeeded(images?: string[], folder = 'bhoomi/posts') {
  if (!images || images.length === 0) {
    return [];
  }

  const uploadedImages = await Promise.all(images.map((image) => uploadImageIfNeeded(image, folder)));
  return uploadedImages.filter((image): image is string => Boolean(image));
}

export async function uploadPostImages(input: {
  coverImage?: string;
  images?: string[];
  folder?: string;
}) {
  const orderedImages = Array.from(
    new Set([input.coverImage, ...(input.images || [])].filter(Boolean).map((image) => String(image).trim()))
  );

  if (orderedImages.length === 0) {
    return {
      coverImage: input.coverImage || '',
      images: [] as string[],
    };
  }

  const uploadedImages = await uploadImagesIfNeeded(
    orderedImages,
    input.folder || 'bhoomi/posts'
  );

  return {
    coverImage: uploadedImages[0] || '',
    images: uploadedImages,
  };
}

export async function uploadFileToCloudinary(file: File, folder = 'bhoomi/posts') {
  if (!canUploadToCloudinary()) {
    throw new Error('Cloudinary environment variables are missing.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, uploaded) => {
        if (error || !uploaded?.secure_url) {
          reject(error || new Error('Cloudinary upload failed.'));
          return;
        }

        resolve(uploaded.secure_url);
      }
    );

    stream.on('error', reject);
    stream.end(buffer);
  });

  return result;
}
