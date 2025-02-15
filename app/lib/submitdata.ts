// lib/submitdata.ts
import axios from 'axios';

export async function submitData(data: FormData) {
    try {
        // Log the FormData contents for debugging
        console.log('Submitting FormData:');
        for (const [key, value] of data.entries()) {
            console.log(key, value);
        }

        const response = await axios.post('/api/batik', data, {
            headers: {
                // Don't set Content-Type manually - let the browser set it
                // This ensures proper multipart/form-data boundary handling
            },
            // This is important - tells axios to send the FormData as-is
            transformRequest: [(data) => data]
        });
        
        console.log('Data submitted successfully:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                'Validation error details:',
                error.response?.data?.details || error.response?.data || error.message
            );
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}
