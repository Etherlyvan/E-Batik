// components/museum/models/ModelErrorBoundary.tsx
'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { ReactNode } from 'react';

interface ModelErrorFallbackProps {
  error: Error;
  modelName: string;
}

function ModelErrorFallback({ error, modelName }: ModelErrorFallbackProps) {
  console.error(`Failed to load model: ${modelName}`, error);
  
  return (
    <mesh>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  );
}

interface ModelErrorBoundaryProps {
  children: ReactNode;
  modelName: string;
}

export function ModelErrorBoundary({ children, modelName }: ModelErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => <ModelErrorFallback {...props} modelName={modelName} />}
      onError={(error) => console.error(`Model loading error for ${modelName}:`, error)}
    >
      {children}
    </ErrorBoundary>
  );
}