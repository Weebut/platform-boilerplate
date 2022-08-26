import { Box, Typography } from '@mui/material';
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

export function SideBar({ groups }: SideBarProps) {
  const [selected, setSelected] = useState<Group>(groups[0]);

  return (
    <Box className="hidden h-full w-[300px] p-6 md:block">
      {groups.map((group, idx) => (
        <Box key={idx} className="my-1 flex flex-col">
          <Box
            onClick={() => setSelected(group)}
            className={
              selected.name === group.name
                ? `flex space-x-2 rounded-lg bg-white p-3 text-lg capitalize`
                : `flex space-x-2 rounded-lg p-3 text-lg transition-colors hover:bg-white`
            }
          >
            <Typography>{group.icon}</Typography>
            <Typography> {group.name}</Typography>
          </Box>
          <Box className="flex flex-col pl-8">
            <Box hidden={selected.name !== group.name} className="h-3" />
            {group.tabs.map((tab, idx) => (
              <Box
                key={idx}
                hidden={selected.name !== group.name}
                className="py-1 text-left text-black text-opacity-70 transition duration-150 ease-in-out hover:translate-x-[3px] hover:text-opacity-100"
              >
                {tab.name}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
