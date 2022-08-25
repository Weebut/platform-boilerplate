import { useFirebaseUser } from '@hooks/firebase-user';
import { signOut } from '@libs/utils/auth/sign-out';
import { AppBar, Box, Button, Link, Toolbar } from '@mui/material';
import NextLink from 'next/link';

export function NavigationBar() {
  const { user } = useFirebaseUser();

  const isLoggedIn = !!user;

  return (
    <AppBar position="static" color="primary">
      <Box className="px-6">
        <Toolbar disableGutters>
          <NextLink href="/" passHref>
            <Link className="font-bold text-white">LOGO</Link>
          </NextLink>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <Box className="flex items-center space-x-4">
                <NextLink href="/my-page" passHref>
                  <Link className="font-bold text-white">{user.email}</Link>
                </NextLink>
                <Button
                  onClick={() => signOut()}
                  className="rounded py-2 px-4 font-bold text-white"
                >
                  SIGN OUT
                </Button>
              </Box>
            ) : (
              <NextLink href="/sign-in" passHref>
                <Link className="rounded py-2 px-4 font-bold text-white">
                  SIGN IN
                </Link>
              </NextLink>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
