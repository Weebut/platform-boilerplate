import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface useWarnBeforeClosingProps {
  isClosable: boolean;
}

export function useWarnBeforeClosing({
  isClosable,
}: useWarnBeforeClosingProps) {
  const router = useRouter();

  useEffect(() => {
    function alertBeforeClosing(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = '');
    }

    function handleBrowseAway() {
      if (isClosable) {
        return;
      } else if (window.confirm('Are you sure you want to leave?')) {
        return;
      }
      router.events.emit('routeChangeError');
      throw 'routeChange aborted.';
    }

    if (!isClosable) {
      window.addEventListener('beforeunload', alertBeforeClosing);
      router.events.on('routeChangeStart', handleBrowseAway);
      return () => {
        window.removeEventListener('beforeunload', alertBeforeClosing);
        router.events.off('routeChangeStart', handleBrowseAway);
      };
    }
  }, [isClosable, router.events]);
}
