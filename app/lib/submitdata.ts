// lib/submitdata.ts
import axios from 'axios';

export async function submitData(data: FormData) {
  try {
    const response = await axios.post('/api/batik', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Data submitted successfully:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
