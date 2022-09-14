import { Container } from '@mui/material';
import { ReactNode } from 'react';

interface StripProps {
  children: ReactNode;
}

export function Strip({ children }: StripProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        width: '100%',
        px: 5,
      }}
      disableGutters
    >
      {children}
    </Container>
  );
}
