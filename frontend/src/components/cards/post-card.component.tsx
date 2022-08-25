import { shortenString } from '@libs/utils/string';
import { Box, Stack, Typography } from '@mui/material';

interface Card {
  title: string;
  description: string;
}

interface PostCardProps {
  card: Card;
}

export function PostCard({ card }: PostCardProps) {
  const maxTitleLength = 20;
  const maxDescriptionLength = 100;

  const title = shortenString(card.title, maxTitleLength);

  const description = shortenString(card.description, maxDescriptionLength);

  return (
    <Box className="mr-6 mb-6 h-[150px] w-[300px] rounded bg-white p-4">
      <Stack spacing={2} className="flex flex-col">
        <Typography>{title}</Typography>
        <Typography className="h-[60px] w-full text-sm">
          {description}
        </Typography>
      </Stack>
      <Box className="text-sm text-primary hover:underline">더보기</Box>
    </Box>
  );
}
