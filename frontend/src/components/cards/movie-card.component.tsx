import { shortenString } from '@libs/utils/string';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import Image from 'next/image';

interface MovieCardProps {
  title: string;
  link: string;
  overview: string;
}

export function MovieCard(props: MovieCardProps) {
  const maxTitleLength = 20;
  const maxOverviewLength = 100;

  const title = shortenString(props.title, maxTitleLength);

  const overview = shortenString(props.overview, maxOverviewLength);

  return (
    <Card sx={{ width: 345, height: 385 }}>
      <Image
        src={props.link}
        alt="thumbnail"
        width={345}
        height={145}
        layout="responsive"
      />

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="h-28">
          {overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">More</Button>
      </CardActions>
    </Card>
  );
}
