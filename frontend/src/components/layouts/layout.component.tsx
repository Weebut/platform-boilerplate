import { Footer } from '@components/footers/footer.component';
import {
  AppBar,
  navigationBarHeight,
} from '@components/app-bars/app-bar.component';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  pt?: number;
  pb?: number;
}

export function Layout({
  children,
  showFooter = true,
  pt = 0,
  pb = 0,
}: LayoutProps) {
  return (
    <Box id="layout" flex="col" width="100%">
      <Box id="main" flex="col" minHeight="100vh" width="100%">
        <AppBar />
        <Box
          width="100%"
          flex="col"
          sx={{
            pt: `${navigationBarHeight + pt}px`,
            pb: `${pb}px`,
          }}
        >
          {children}
        </Box>
      </Box>
      <Box display={showFooter ? 'block' : 'hidden'}>
        <Footer />
      </Box>
    </Box>
  );
}
