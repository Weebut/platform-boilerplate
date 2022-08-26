import { MovieCard } from '@components/cards/movie-card.component';
import { Layout } from '@components/layouts/layout.component';
import { Strip } from '@components/strips/strip.component';
import { useIntersectionObserver } from '@hooks/intersection-observer';
import { useMoviesInfinite } from '@hooks/use-movies-infinte';
import { useWarnBeforeClosing } from '@hooks/warn-before-closing';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

export function MoviesContainer() {
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

  useWarnBeforeClosing({ isClosable: false });

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
    <Layout showFooter={false}>
      <Strip>
        <Box className="py-32">
          <Typography className="text-4xl font-bold">
            Movies Now Playing
          </Typography>
          {/* Infinite scroll */}
          <Box className="flex flex-wrap gap-4 py-12">
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
              className="h-32"
              hidden={!moviesResult?.hasNext}
            />
          </Box>
        </Box>
      </Strip>
    </Layout>
  );
}
