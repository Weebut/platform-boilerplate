import { Container } from '@mui/material';
import { ReactNode } from 'react';

interface StripProps {
  children: ReactNode;
}

export function Strip({ children }: StripProps) {
  return (
    <Container maxWidth="lg" className="w-full px-6 lg:px-0">
      {children}
    </Container>
  );
}
