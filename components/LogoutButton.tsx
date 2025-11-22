import { GoSignOut } from 'react-icons/go';
import { Button } from './ui/button';

const LogoutButton = () => {
  return (
    <form>
      <Button
        variant='ghost'
        className='flex w-full justify-start hover:bg-gray-200 cursor-pointer tracking-wider'
      >
        <GoSignOut />
        <span>Sign out</span>
      </Button>
    </form>
  );
};

export default LogoutButton;
