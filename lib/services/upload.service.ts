<<<<<<< HEAD
// lib/services/upload.service.ts
// 🔄 UPLOAD FEATURE - File upload service for Cloudinary (Server-side only)

interface CloudinaryResult {
  secure_url: string;
  public_id: string;
}

// Server-side upload function
export async function uploadToCloudinary(file: File): Promise<{
=======
// 🔄 UPLOAD FEATURE - File upload service via API route

interface CloudinaryUploadResult {
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
  secure_url: string;
  public_id: string;
}

<<<<<<< HEAD
    // Dynamic import for server-side only
    const { v2: cloudinary } = await import('cloudinary');
    
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Upload to Cloudinary
    const result = await new Promise<CloudinaryResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'batik-uploads',
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { format: 'webp' },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result as CloudinaryResult);
          else reject(new Error('No result from Cloudinary'));
        }
      ).end(buffer);
=======
export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  try {
    // Create FormData for API route
    const formData = new FormData();
    formData.append('file', file);

    // Upload via our API route (server-side)
    const response = await fetch('/api/cloudinary/upload', {
      method: 'POST',
      body: formData,
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Upload failed: ${response.status} ${errorData}`);
    }

    const result = await response.json();

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
<<<<<<< HEAD
    // Dynamic import for server-side only
    const { v2: cloudinary } = await import('cloudinary');
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    await cloudinary.uploader.destroy(publicId);
=======
    // Create FormData for delete request
    const formData = new FormData();
    formData.append('public_id', publicId);
    
    // For delete operations, we need to use server-side API route
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Delete failed: ${response.status} ${errorData}`);
    }
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
}