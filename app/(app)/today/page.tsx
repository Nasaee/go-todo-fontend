import MainHeaderTitle from '@/components/MainHeaderTitle';
import TasksCard from '@/components/TasksCard';
import TodoItem from '@/components/TodoItem';
import { Button } from '@/components/ui/button';
import { GoPlusCircle } from 'react-icons/go';

const mockToday = [
  {
    id: 1,
    title: 'Finish the report',
    isSuccess: false,
  },
  {
    id: 2,
    title: 'Team meeting at 10 AM',
    isSuccess: true,
  },
  {
    id: 3,
    title: 'Grocery shopping',
    isSuccess: false,
  },
];

const TodayPage = () => {
  return (
    <section className='flex flex-col gap-12 h-full'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <MainHeaderTitle>Upcoming</MainHeaderTitle>
          <span className='bg-gray-200 text-gray-700 py-1 px-4 rounded-full tracking-wide'>
            {10}
          </span>
        </div>
        <Button
          variant='outline'
          className='hover:bg-primary hover:text-white tracking-wider cursor-pointer'
        >
          <GoPlusCircle /> Add new task
        </Button>
      </div>

      <TasksCard className='flex-1'>
        <MainHeaderTitle>Today</MainHeaderTitle>

        <ul>
          {mockToday?.map((task) => {
            const isLastItem = mockToday.length === task.id;
            return (
              <li key={task.id}>
                <TodoItem
                  isLastItem={isLastItem}
                  title={task.title}
                  isSuccess={task.isSuccess}
                />
              </li>
            );
          })}
        </ul>
      </TasksCard>
    </section>
  );
};

export default TodayPage;
