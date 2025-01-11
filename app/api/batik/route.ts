// app/api/batik/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prismaClient';

// Definisikan tipe respons upload Cloudinary
interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: unknown; // Untuk menangkap properti lain yang mungkin ada
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    console.log('Received form data:', formData);

    const foto = formData.get('foto') as File;
    const nama = formData.get('nama') as string;
    const tahun = formData.get('tahun') as string;
    const tema = formData.get('tema') as string;
    const warna = formData.get('warna') as string;
    const teknik = formData.get('teknik') as string;
    const jenisKain = formData.get('jenisKain') as string;
    const pewarna = formData.get('pewarna') as string;
    const bentuk = formData.get('bentuk') as string;
    const histori = formData.get('histori') as string;
    const dimensi = formData.get('dimensi') as string;

    if (!foto) {
      console.error('Foto is required');
      return NextResponse.json({ message: 'Foto is required' }, { status: 400 });
    }

    console.log('Converting file to buffer');
    const buffer = await foto.arrayBuffer();

    console.log('Uploading to Cloudinary');
    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'batik' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload result:', result);
            resolve(result as CloudinaryUploadResult);
          }
        }
      );
      stream.end(Buffer.from(buffer));
    });

    console.log('Inserting data into Prisma');
    const batik = await prisma.batik.create({
      data: {
        foto: uploadResult.secure_url,
        nama,
        tahun,
        tema,
        warna,
        teknik,
        jenisKain,
        pewarna,
        bentuk,
        histori,
        dimensi,
      },
    });

    console.log('Data successfully uploaded to Prisma:', batik);
    return NextResponse.json({
      message: 'Data successfully uploaded',
      data: batik,
    });
  } catch (error) {
    console.error('Error processing data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Server error', error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const batiks = await prisma.batik.findMany();
    return NextResponse.json(batiks);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Server error', error: errorMessage }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  const numericId = Number(id);
  if (isNaN(numericId)) {
    return NextResponse.json({ message: 'ID is not a valid number' }, { status: 400 });
  }

  try {
    const batik = await prisma.batik.findUnique({
      where: { id: numericId },
    });

    if (!batik) {
      return NextResponse.json({ message: 'Batik not found' }, { status: 404 });
    }

    await prisma.batik.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ message: 'Batik deleted successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Server error', error: errorMessage }, { status: 500 });
  }
}