import React, { useEffect, useState } from 'react';
import { Filter } from '../components/Filter';
import { Footer } from '../components/Footer';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { Task } from '../types';
import taskServices from '../services/task';

export const ToDo = ({ username, logout }: { username: string, logout: () => void }) => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [filter, setFilter] = useState<"all" | "active" | "complete">('all');

    useEffect(() => {
        const getTaskDB = async () => {
            const response = await taskServices.getAllTaskUser();
            setTasks(response);
        };
        getTaskDB();
    }, []);

    const toggleComplete = async (taskToUpdate:Task) => {
        const response = await taskServices.updateTask(taskToUpdate);
        console.log(response);
        setTasks(prevTasks => prevTasks.map(task => task.id === taskToUpdate.id ? { id:task.id,text:response.text,complete:response.complete } : task));
    };

    const deleteTask = async (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        await taskServices.deleteTask(id);
    };

    const deleteCompleteTasks = () => {
        if (window.confirm('you want to delete the complete tasks')) {
            setTasks(prevTask => prevTask.filter(task => task.complete === false));
            tasks.filter(t => t.complete === true).map(async (t) => {
                await taskServices.deleteTask(t.id);
                return;
            });
        } else {
            return;
        }
    };

    const changeFilter = (e: "all" | "active" | "complete") => {
        setFilter(e);
    };

    const handleNewTask = async (inputTask: string) => {
        const response = await taskServices.createTask({ text: inputTask, complete: false });
        setTasks([...tasks, { id: response.id, text: inputTask, complete: false }]);
    };

    const handleLogOut = () => {
        if (window.confirm('Do you want to log out?')) {
            // setUser(null);
            // window.localStorage.removeItem('todoCredentials');
            setTasks([]);
            logout();
        } else {
            return;
        }
    };

    return (
        <div className='ToDo'>
            <div className="head">
                <div className="head-title">
                    <p>TODO APP</p>
                    <h4>{username}</h4>
                    <button onClick={() => handleLogOut()} >LOG OUT</button>
                </div>
                <TaskForm handleNewTask={handleNewTask} />
            </div>
            <div className="body">
                <TaskList filter={filter} toggleComplete={toggleComplete} deleteTask={deleteTask} tasks={tasks} />
                <Footer filter={filter} tasks={tasks} deleteCompleteTasks={deleteCompleteTasks} />
            </div>
            <div className="footer">
                <Filter changeFilter={changeFilter} />
            </div>
        </div>
    );
};