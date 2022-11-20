import { render, screen, waitFor} from '@testing-library/react';
import TaskItem from '../todo-component/task-list-component/TaskList';
import TaskSearch from '../todo-component/task-search-component/TaskSearch';

describe('Task List Component', () => {
    test('renders Task List Component', async () => {
        render(
            <TaskItem  deleteTask={jest.fn()}
          doneTask={jest.fn()}
          getSelectedId={jest.fn()}
          task={ {
            id: '7768bc90-35ae-43cb-9d68-8fb0a70cfa29',
            operation: null,
            taskStatus: 'ACTIVE',
            taskTitle: 'javascript'
          }}
          searchComponent={
            <TaskSearch
              searchHandlder={jest.fn()}
              defaultValue='Title'
            />
          } />
);
        expect(screen.getByText('javascript')).toBeInTheDocument();
      });

      test('renders Task List Component with active status', async () => {
        render(
            <TaskItem  deleteTask={jest.fn()}
          doneTask={jest.fn()}
          getSelectedId={jest.fn()}
          task={ {
            id: '7768bc90-35ae-43cb-9d68-8fb0a70cfa29',
            operation: null,
            taskStatus: 'ACTIVE',
            taskTitle: 'javascript'
          }}
          searchComponent={
            <TaskSearch
              searchHandlder={jest.fn()}
              defaultValue='Title'
            />
          } />
);
        expect(screen.getByTestId('active-btn')).toBeInTheDocument();
      });

      test('renders Task List Component with completed status', async () => {
        render(
            <TaskItem  deleteTask={jest.fn()}
          doneTask={jest.fn()}
          getSelectedId={jest.fn()}
          task={ {
            id: '7768bc90-35ae-43cb-9d68-8fb0a70cfa29',
            operation: null,
            taskStatus: 'COMPLETED',
            taskTitle: 'javascript'
          }}
          searchComponent={
            <TaskSearch
              searchHandlder={jest.fn()}
              defaultValue='Title'
            />
          } />
);
        expect(screen.getByTestId('completed')).toBeInTheDocument();
      });
     
});
