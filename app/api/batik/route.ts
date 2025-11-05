// 🎨 BATIK FEATURE - API endpoints for batik CRUD operations
import { NextRequest, NextResponse } from 'next/server';
import { getBatiks, createBatik } from '@/lib/actions/batik';
import { CreateBatikSchema } from '@/lib/types/batik';
import { z } from 'zod';

// GET /api/batik - Fetch all batiks
export async function GET() {
  try {
    const batiks = await getBatiks();
    return NextResponse.json(batiks);
  } catch (error) {
    console.error('Error fetching batiks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batiks' },
      { status: 500 }
    );
  }
}

// POST /api/batik - Create new batik
export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const body = await request.json();
    const validatedData = CreateBatikSchema.parse(body);

    // Create batik
    const batik = await createBatik(validatedData);
    
    return NextResponse.json(batik, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating batik:', error);
    return NextResponse.json(
      { error: 'Failed to create batik' },
      { status: 500 }
    );
  }
}