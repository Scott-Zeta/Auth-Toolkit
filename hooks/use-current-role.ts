import { useSession } from 'next-auth/react';

// Get the current session in a client component
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user?.role;
};
