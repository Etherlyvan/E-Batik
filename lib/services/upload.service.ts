// lib/services/upload.service.ts
// 🔄 UPLOAD FEATURE - File upload service for Cloudinary (Server-side only)

interface CloudinaryResult {
  secure_url: string;
  public_id: string;
}

// Server-side upload function
export async function uploadToCloudinary(file: File): Promise<{
  secure_url: string;
  public_id: string;
}> {
  try {
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

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
    });

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
    // Dynamic import for server-side only
    const { v2: cloudinary } = await import('cloudinary');
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
}