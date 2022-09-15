import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LinkButtonProps {
  href: string | URL;
  children: ReactNode;
  buttonProps?: any;
}

export default function LinkButton({
  href,
  children,
  buttonProps,
}: LinkButtonProps) {
  return (
    <Box>
      <Link href={href} passHref>
        <Button {...buttonProps}>{children}</Button>
      </Link>
    </Box>
  );
}
