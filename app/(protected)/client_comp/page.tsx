'use client';
import { useCurrentUser } from '@/hooks/use-current-user';
import { UserInfo } from '@/components/user-info';

const ServerPage = () => {
  const user = useCurrentUser();
  return <UserInfo label="🧑‍💻 Client component" user={user} />;
};

export default ServerPage;
