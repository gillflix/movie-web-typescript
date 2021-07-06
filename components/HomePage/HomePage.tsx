import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import AppLayout from '../AppLayout';
import CardGrid from '../CardGrid';
import { MovieType } from '../../models/movie';
import { UserType } from '../../models/user';
import { NextSeo } from 'next-seo';

interface HomePageProps {
  user: UserType;
  movies: { data: MovieType[] };
  movieID: string | string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  user,
  movies,
  movieID,
}): React.ReactElement => {
  const toast = useToast();
  useEffect(() => {
    if (!user.isAdmin && !user.isReviewer) {
      toast({
        id: `nonReviewer`,
        variant: `solid`,
        position: `top`,
        title: `View-only mode`,
        description: `Join the Discord server and say hi to enable reviewing, link in page footer.`,
        status: `info`,
        isClosable: true,
      });
    }
  }, [toast, user]);
  return (
    <>
      <NextSeo title="Home" />
      <AppLayout user={user} showMovies>
        <div>
          <CardGrid movies={movies} user={user} movieID={movieID} />
        </div>
      </AppLayout>
    </>
  );
};
