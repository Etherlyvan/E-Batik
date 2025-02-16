import React, { useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';

interface UploadAlertProps {
  show: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const UploadAlert: React.FC<UploadAlertProps> = ({
  show,
  type,
  message,
  onClose
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 transition-all duration-300 transform translate-x-0 opacity-100">
      <Alert 
        variant={type === 'success' ? 'default' : 'destructive'}
        className={`max-w-md ${
          type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        ) : (
          <XCircle className="h-4 w-4 text-red-600" />
        )}
        <AlertTitle className={type === 'success' ? 'text-green-800' : 'text-red-800'}>
          {type === 'success' ? 'Berhasil' : 'Error'}
        </AlertTitle>
        <AlertDescription className={type === 'success' ? 'text-green-700' : 'text-red-700'}>
          {message}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UploadAlert;

