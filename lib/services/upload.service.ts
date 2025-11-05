// lib/services/upload.service.ts
// 🔄 UPLOAD FEATURE - File upload service via API route

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

/**
 * Upload a file to Cloudinary via API route
 * @param file - File to upload
 * @returns Promise with secure_url and public_id
 */
export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  try {
    // Validate file
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`);
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
    }

    // Create FormData for API route
    const formData = new FormData();
    formData.append('file', file);

    console.log('Uploading file to Cloudinary:', {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
    });

    // Upload via our API route (server-side)
    const response = await fetch('/api/cloudinary/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Upload failed:', errorData);
      throw new Error(`Upload failed: ${response.status} ${errorData}`);
    }

    const result = await response.json();

    if (!result.secure_url || !result.public_id) {
      throw new Error('Invalid response from upload service');
    }

    console.log('File uploaded successfully:', result.public_id);

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    
    if (error instanceof Error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
    
    throw new Error('Failed to upload image: Unknown error');
  }
}

/**
 * Delete a file from Cloudinary via API route
 * @param publicId - Public ID of the file to delete
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    // Validate publicId
    if (!publicId || typeof publicId !== 'string') {
      throw new Error('Invalid public ID provided');
    }

    // Create FormData for delete request
    const formData = new FormData();
    formData.append('public_id', publicId);

    console.log('Deleting file from Cloudinary:', publicId);
    
    // For delete operations, we need to use server-side API route
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Delete failed:', errorData);
      throw new Error(`Delete failed: ${response.status} ${errorData}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error('Delete operation was not successful');
    }

    console.log('File deleted successfully:', publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    
    if (error instanceof Error) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }
    
    throw new Error('Failed to delete image: Unknown error');
  }
}

/**
 * Upload multiple files to Cloudinary
 * @param files - Array of files to upload
 * @returns Promise with array of upload results
 */
export async function uploadMultipleToCloudinary(
  files: File[]
): Promise<CloudinaryUploadResult[]> {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    console.log(`Uploading ${files.length} files to Cloudinary...`);

    const uploadPromises = files.map((file, index) => 
      uploadToCloudinary(file)
        .then(result => {
          console.log(`File ${index + 1}/${files.length} uploaded successfully`);
          return result;
        })
        .catch(error => {
          console.error(`Failed to upload file ${index + 1}/${files.length}:`, error);
          throw error;
        })
    );

    const results = await Promise.all(uploadPromises);
    
    console.log(`All ${results.length} files uploaded successfully`);
    
    return results;
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    throw error;
  }
}

/**
 * Delete multiple files from Cloudinary
 * @param publicIds - Array of public IDs to delete
 */
export async function deleteMultipleFromCloudinary(
  publicIds: string[]
): Promise<void> {
  try {
    if (!publicIds || publicIds.length === 0) {
      throw new Error('No public IDs provided');
    }

    console.log(`Deleting ${publicIds.length} files from Cloudinary...`);

    const deletePromises = publicIds.map((publicId, index) => 
      deleteFromCloudinary(publicId)
        .then(() => {
          console.log(`File ${index + 1}/${publicIds.length} deleted successfully`);
        })
        .catch(error => {
          console.error(`Failed to delete file ${index + 1}/${publicIds.length}:`, error);
          throw error;
        })
    );

    await Promise.all(deletePromises);
    
    console.log(`All ${publicIds.length} files deleted successfully`);
  } catch (error) {
    console.error('Error deleting multiple files:', error);
    throw error;
  }
}

/**
 * Get Cloudinary image URL with transformations
 * @param publicId - Public ID of the image
 * @param transformations - Cloudinary transformation options
 * @returns Transformed image URL
 */
export function getCloudinaryUrl(
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'limit';
    quality?: 'auto' | number;
    format?: 'webp' | 'jpg' | 'png';
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    console.error('Cloudinary cloud name not configured');
    return publicId;
  }

  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  
  if (!transformations) {
    return `${baseUrl}/${publicId}`;
  }

  const transformParts: string[] = [];
  
  if (transformations.width) {
    transformParts.push(`w_${transformations.width}`);
  }
  
  if (transformations.height) {
    transformParts.push(`h_${transformations.height}`);
  }
  
  if (transformations.crop) {
    transformParts.push(`c_${transformations.crop}`);
  }
  
  if (transformations.quality) {
    transformParts.push(`q_${transformations.quality}`);
  }
  
  if (transformations.format) {
    transformParts.push(`f_${transformations.format}`);
  }

  const transformString = transformParts.join(',');
  
  return `${baseUrl}/${transformString}/${publicId}`;
}

/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID or null if invalid
 */
export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    
    if (!cloudName || !url.includes(cloudName)) {
      return null;
    }

    // Extract public ID from URL
    // Format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}
    const parts = url.split('/upload/');
    
    if (parts.length !== 2) {
      return null;
    }

    const afterUpload = parts[1];
    
    // Remove transformations if present
    const publicIdParts = afterUpload.split('/');
    
    // If there are transformations, the public ID is after them
    const publicId = publicIdParts.length > 1 
      ? publicIdParts.slice(1).join('/')
      : afterUpload;

    // Remove file extension
    return publicId.replace(/\.[^/.]+$/, '');
  } catch (error) {
    console.error('Error extracting public ID from URL:', error);
    return null;
  }
}

/**
 * Validate if a URL is a Cloudinary URL
 * @param url - URL to validate
 * @returns true if valid Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    return false;
  }

  return url.includes(`res.cloudinary.com/${cloudName}`);
}