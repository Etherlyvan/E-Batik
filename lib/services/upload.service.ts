// 🔄 UPLOAD FEATURE - File upload service via API route

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  try {
    // Create FormData for API route
    const formData = new FormData();
    formData.append('file', file);

    // Upload via our API route (server-side)
    const response = await fetch('/api/cloudinary/upload', {
      method: 'POST',
      body: formData,
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
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
}