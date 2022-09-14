import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Strip } from './strip.component';

interface FullWidthStripProps {
  children: ReactNode;
  bgColor?: FullWidthStripBackgroundColorEnums | string;
}

export enum FullWidthStripBackgroundColorEnums {
  TRANSPARENT = 'transparent',
  BLACK = '#000',
  WHITE = '#fff',
  PRIMARY = '#556cd6',
}

export function FullWidthStrip({
  children,
  bgColor = FullWidthStripBackgroundColorEnums.TRANSPARENT,
}: FullWidthStripProps) {
  // TODO : Reduce redundancy

  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: bgColor,
      }}
    >
      <Strip>{children}</Strip>
    </Box>
  );
}
