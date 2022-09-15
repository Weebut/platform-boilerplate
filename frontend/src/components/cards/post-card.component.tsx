import { shortenString } from '@libs/utils/string';
import { Box, Stack, Typography } from '@mui/material';

interface Card {
  title: string;
  description: string;
}

interface PostCardProps {
  card: Card;
}

export default function PostCard({ card }: PostCardProps) {
  const maxTitleLength = 20;
  const maxDescriptionLength = 100;

  const title = shortenString(card.title, maxTitleLength);

  const description = shortenString(card.description, maxDescriptionLength);

  return (
    <Stack
      spacing={6}
      height={200}
      width={300}
      borderRadius="10px"
      p={4}
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Stack spacing={3} flex="col">
        <Typography fontWeight="bold">{title}</Typography>
        <Typography height={60} width="100%" fontSize={14}>
          {description}
        </Typography>
      </Stack>
      <Box>
        <Typography
          fontSize={14}
          sx={{
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          더보기
        </Typography>
      </Box>
    </Stack>
  );
}
