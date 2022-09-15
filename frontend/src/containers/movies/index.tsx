import MovieCard from '@components/cards/movie-card.component';
import Layout from '@components/layouts/layout.component';
import Strip from '@components/strips/strip.component';
import { useIntersectionObserver } from '@hooks/intersection-observer';
import { useMoviesInfinite } from '@hooks/use-movies-infinte';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function MoviesContainer() {
  const moviesResult = useMoviesInfinite();

  const infiniteScrollTarget = 'load-more';

  useEffect(() => {
    if (moviesResult.error) {
      alert('API 호출에 실패했습니다!');
    }
  }, [moviesResult.error]);

  useIntersectionObserver({
    isLoading: moviesResult.isLoading,
    hasNext: moviesResult.hasNext,
    goNext: moviesResult.goNext,
    target: infiniteScrollTarget,
  });

  function getMovies() {
    if (moviesResult) {
      const movies: any[] = [];
      moviesResult.batchs.map((batch) =>
        batch.movies.map((movie) => movies.push(movie)),
      );

      return movies;
    }
    return [];
  }

  return (
    <Layout showFooter={false} pt={80} pb={80}>
      <Strip>
        <Box>
          <Typography fontWeight="bold" variant="h4">
            Movies Now Playing
          </Typography>
          {/* Infinite scroll */}
          <Box
            display="flex"
            sx={{
              flexWrap: 'wrap',
              gap: 4,
              py: 12,
            }}
          >
            {getMovies().map((movie, idx) => (
              <MovieCard
                key={idx}
                title={movie.title}
                link={`${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/${process.env.NEXT_PUBLIC_MOVIE_THUMBNAIL}/${movie.thumbnail}`}
                overview={movie.overview}
              />
            ))}
            <Box
              id={infiniteScrollTarget}
              height={128}
              hidden={!moviesResult?.hasNext}
            />
          </Box>
        </Box>
      </Strip>
    </Layout>
  );
}
