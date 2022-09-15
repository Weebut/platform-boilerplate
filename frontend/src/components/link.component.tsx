import { Link as MaterialLink } from '@mui/material';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import { URL } from 'url';

interface LinkProps {
  href: string | URL;
  children: ReactNode;
  sx?: any;
}

export default function Link({ children, href, sx }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <MaterialLink underline="none" sx={sx}>
        {children}
      </MaterialLink>
    </NextLink>
  );
}
