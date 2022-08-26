import { Footer } from '@components/footers/footer.component';
import { NavigationBar } from '@components/navigation-bars/navigation-bar.component';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <Box className="flex w-full flex-col">
      <Box className="flex min-h-screen w-full flex-col">
        <NavigationBar />
        <Box className="flex w-full flex-col">{children}</Box>
      </Box>
      {showFooter && <Footer />}
    </Box>
  );
}
