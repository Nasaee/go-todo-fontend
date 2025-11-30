'use client';

import MainHeaderTitle from '@/components/MainHeaderTitle';
import { Button } from '@/components/ui/button';
import { GoPlusCircle } from 'react-icons/go';
import TodoItem from '../../../components/TodoItem';
import TasksCard from '@/components/TasksCard';
import CreateTaskDialog from '@/components/CreateTaskDialog';
import { useState } from 'react';

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

const UpcomingPage = () => {
  const [openCreateTask, setOpenCreateTask] = useState(false);
  return (
    <>
      <section className='flex flex-col gap-12'>
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
            onClick={() => setOpenCreateTask(true)}
          >
            <GoPlusCircle /> Add new task
          </Button>
        </div>

        <TasksCard>
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

        <div className='grid grid-cols-2  gap-4'>
          <TasksCard>
            <MainHeaderTitle>Tomorrow</MainHeaderTitle>
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
          <TasksCard>
            <MainHeaderTitle>This week</MainHeaderTitle>
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
        </div>
      </section>
      <CreateTaskDialog
        open={openCreateTask}
        onClose={() => setOpenCreateTask(false)}
      />
    </>
  );
};

export default UpcomingPage;
