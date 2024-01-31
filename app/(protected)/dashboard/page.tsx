import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

const dashboard = async () => {
  const session = await auth();
  return (
    <div>
      Welcome to dash board. Your session is: {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};

export default dashboard;
