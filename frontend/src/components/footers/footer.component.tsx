import { Box } from '@mui/material';

export default function Footer() {
  return (
    <Box
      display="flex"
      height={80}
      width="100%"
      alignItems="center"
      justifyContent="center"
      borderTop="1px solid"
      borderColor="grey.300"
      fontSize="0.875rem"
    >
      <Box>Copyright © 2022 Weebut Corp. All right reserved.</Box>
    </Box>
  );
}
