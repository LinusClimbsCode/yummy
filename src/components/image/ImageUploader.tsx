import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

function getTransformedUrl(url: string) {
  // Add resize and optimization after "/upload/"
  return url.replace(
    "/upload/",
    "/upload/q_auto,f_auto,w_1200,h_1200,c_fill,g_auto/"
    // Example: resize to 1200x1200, auto quality & format, preserve aspect ratio and center crop
  );
}

export default function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET || '');
    formData.append('folder', 'yummy_images');

    // Upload directly to Cloudinary
    if (!CLOUDINARY_URL) {
      alert("Cloudinary URL is not configured!");
      return;
    }
    
    const res = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.secure_url) {
      const transformedUrl = getTransformedUrl(data.secure_url);
      onUpload(transformedUrl);
    } else {
      alert("Upload failed!");
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  return (
    <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer">
      <input {...getInputProps()} />
      {isDragActive
        ? <p>Drop the image here...</p>
        : <p>Drag & drop an image, or click to select file</p>
      }
    </div>
  );
}