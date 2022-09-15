import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

interface SideBarProps {
  groups: Group[];
}

export type Group = {
  icon: string;
  name: string;
  tabs: Tab[];
};

type Tab = {
  name: string;
};

export default function SideBar({ groups }: SideBarProps) {
  const [selected, setSelected] = useState<Group>(groups[0]);

  return (
    <Stack
      id="side-bar"
      display={{ xs: 'none', md: 'block' }}
      height="100%"
      width="300px"
      p={6}
      spacing={3}
    >
      {groups.map((group, idx) => (
        <Box key={idx} flex="col" my={1}>
          <Stack
            onClick={() => setSelected(group)}
            direction="row"
            spacing={2}
            borderRadius="10px"
            p={3}
            fontSize={16}
            sx={{
              transition: 'all 150ms ease-in-out',
              backgroundColor:
                selected.name === group.name ? 'white' : 'transparent',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
          >
            <Typography>{group.icon}</Typography>
            <Typography> {group.name}</Typography>
          </Stack>
          <Box flex="col" pl={8}>
            <Box hidden={selected.name !== group.name} height={12} />
            {group.tabs.map((tab, idx) => (
              <Box
                key={idx}
                hidden={selected.name !== group.name}
                py={1}
                textAlign="left"
                color="black"
                sx={{
                  opacity: 0.7,
                  transition: 'all 150ms ease-in-out',
                  '&:hover': {
                    transform: 'translateX(3px)',
                    opacity: 1,
                  },
                }}
              >
                {tab.name}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
