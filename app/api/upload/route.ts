import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Define a type for Cloudinary upload result
interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    // Common additional Cloudinary response properties
    asset_id?: string;
    version?: number;
    version_id?: string;
    signature?: string;
    width?: number;
    height?: number;
    format?: string;
    resource_type?: string;
    created_at?: string;
    tags?: string[];
    bytes?: number;
    type?: string;
    url?: string;
    placeholder?: boolean;
    original_filename?: string;
  }
  
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const config = {
  api: {
    bodyParser: false
  }
};

export async function POST(req: Request) {
  try {
    if (!req.body) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert the request to FormData
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert the File to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Convert buffer to base64 string
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload(
        base64String,
        {
          folder: 'batik',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(new Error(error.message || 'Failed to upload to Cloudinary'));
          } else if (result) {
            resolve(result as CloudinaryUploadResult);
          } else {
            reject(new Error('Unknown error occurred during upload'));
          }
        }
      );
    });

    // Return the Cloudinary response
    return NextResponse.json({
      secure_url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
