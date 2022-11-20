import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tasks from '../todo-component/Tasks';
import * as taskService from '../service/TaskService';

describe('Task Component', () => {
    test('renders Task Component', () => {
        render(<MemoryRouter>
            <Tasks />
        </MemoryRouter>);
        const viewAllLink = screen.getByTestId('view all');
        const activeLink = screen.getByTestId('active');
        const completedlLink = screen.getByTestId('completed');
        expect(viewAllLink).toBeInTheDocument();
        expect(activeLink).toBeInTheDocument();
        expect(completedlLink).toBeInTheDocument();
      });

      test('View All link should be active by default', () => {
        render(<MemoryRouter>
            <Tasks />
        </MemoryRouter>);
        const viewAllLink = screen.getByTestId('view all');
        expect(viewAllLink.classList.contains('active')).toBeTruthy();
      });

      test('All tasks should be render by default', async () => {
        const tasklistMock = jest.spyOn(taskService, 'getTaskList')
            tasklistMock.mockResolvedValue({
                            data: [
                                {
                                    id: "7768bc90-35ae-43cb-9d68-8fb0a70cfa29",
                                    operation: null,
                                    taskStatus: "ACTIVE",
                                    taskTitle: "javascript"
                                },
                                {
                                    id: "7768bc90-35ae-43cb-9d68-8fb0a70cfa30",
                                    operation: null,
                                    taskStatus: "ACTIVE",
                                    taskTitle: "react"
                                }
                            ],
                        })
        
              render(<MemoryRouter>
            <Tasks />
        </MemoryRouter>)

        await waitFor(() => expect(screen.getByText(/react/)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/javascript/)).toBeInTheDocument());
      });

      test('Completed tasks should be render', async () => {
        const tasklistMock = jest.spyOn(taskService, 'getTaskList')
            tasklistMock.mockResolvedValue({
                            data: [
                                {
                                    id: "7768bc90-35ae-43cb-9d68-8fb0a70cfa29",
                                    operation: null,
                                    taskStatus: "COMPLETED",
                                    taskTitle: "javascript"
                                },
                                {
                                    id: "7768bc90-35ae-43cb-9d68-8fb0a70cfa30",
                                    operation: null,
                                    taskStatus: "ACTIVE",
                                    taskTitle: "react"
                                }
                            ],
                        })
        
              render(<MemoryRouter initialEntries={['/?filter=completed']}>
            <Tasks />
        </MemoryRouter>)
        await waitFor(() => expect(screen.getByText(/javascript/)).toBeInTheDocument());
      });

      describe('Task action component', () => {
        const mockData = {
            data: [
                {
                    id: "7768bc90-35ae-43cb-9d68-8fb0a70cfa29",
                    operation: null,
                    taskStatus: "COMPLETED",
                    taskTitle: "javascript"
                },
                {
                    id: "7768bc90-35ae-43cb-9d68-8fb0a70cfa30",
                    operation: null,
                    taskStatus: "ACTIVE",
                    taskTitle: "react"
                }
            ],
        };
        const tasklistMock = jest.spyOn(taskService, 'getTaskList')
            tasklistMock.mockResolvedValue(mockData)
        const saveTaskListMock = jest.spyOn(taskService, 'addTask');
        saveTaskListMock.mockImplementation(data => Promise.resolve({...mockData, data: [...mockData.data, { id: "7768bc90-35ae-43cb-9d68-8fb0a70cfa30",
        operation: null,
        taskStatus: "ACTIVE",
        taskTitle: data}]}))    

        test('Add task to search box', () => {
            render(<MemoryRouter>
                <Tasks />
            </MemoryRouter>);
            const searchText = screen.getByTestId('search-text-box');
            fireEvent.change(searchText, {target: {value: 'facebook'}});
            expect(searchText).toHaveValue('facebook')
          });
        
      })

      
});
