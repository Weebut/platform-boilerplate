import HeadMeta from '@components/heads/meta-head.component';
import HomeContainer from '@containers/home';
import { Box } from '@mui/material';

export default function HomePage() {
  return (
    <Box>
      <HeadMeta
        title="NextJS Boilerplate"
        description="NextJS Boilerplate"
        url="http://localhost:3000"
      />
      <HomeContainer />
    </Box>
  );
}
