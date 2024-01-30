import { auth } from '@/auth';

const dashboard = async () => {
  const session = await auth();
  return (
    <div>Welcome to dash board. Your session is: {JSON.stringify(session)}</div>
  );
};

export default dashboard;
