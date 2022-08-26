import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Strip } from './strip.component';

interface FullWidthStripProps {
  children: ReactNode;
  bgColor?: FullWidthStripBackgroundColorEnums;
}

export enum FullWidthStripBackgroundColorEnums {
  TRANSPARENT = 'transparent',
  BLACK = 'black',
  WHITE = 'white',
  PRIMARY = 'primary',
  // Add predefined colors
}

export function FullWidthStrip({
  children,
  bgColor = FullWidthStripBackgroundColorEnums.TRANSPARENT,
}: FullWidthStripProps) {
  // TODO : Reduce redundancy

  switch (bgColor) {
    case FullWidthStripBackgroundColorEnums.BLACK:
      return (
        <Box className={`w-full bg-black`}>
          <Strip>{children}</Strip>
        </Box>
      );
    case FullWidthStripBackgroundColorEnums.WHITE:
      return (
        <Box className={`w-full bg-white`}>
          <Strip>{children}</Strip>
        </Box>
      );
    case FullWidthStripBackgroundColorEnums.PRIMARY:
      return (
        <Box className={`w-full bg-primary`}>
          <Strip>{children}</Strip>
        </Box>
      );
    default:
      return (
        <Box className={`w-full bg-transparent`}>
          <Strip>{children}</Strip>
        </Box>
      );
  }
}
