import { Footer } from '@components/footers/footer.component';
import { NavigationBar } from '@components/navigation-bars/navigation-bar.component';
import { Group, SideBar } from '@components/side-bars/side-bar.component';
import { Box } from '@mui/material';

import { ReactNode } from 'react';

interface SideBarLayoutProps {
  children: ReactNode;
  groups: Group[];
  showFooter?: boolean;
}

export function SideBarLayout({
  children,
  groups,
  showFooter = false,
}: SideBarLayoutProps) {
  return (
    <Box className="flex w-screen flex-col">
      <Box className="flex h-auto min-h-screen w-full flex-col bg-gray-100">
        <NavigationBar />
        <Box className="flex h-auto w-full flex-col py-8 md:flex-row md:py-4">
          <SideBar groups={groups} />
          <Box className="flex h-full flex-col items-start justify-start">
            {children}
          </Box>
        </Box>
      </Box>
      {showFooter && <Footer />}
    </Box>
  );
}
