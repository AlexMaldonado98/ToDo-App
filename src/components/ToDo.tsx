import React, { useEffect, useState } from 'react';
import { Filter } from '../components/Filter';
import { Footer } from '../components/Footer';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { Task } from '../types';

export const ToDo = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [filter, setFilter] = useState<"all" | "active" | "complete">('all');
    
    useEffect(() => {
        if(localStorage.getItem('todoStorage') === null){
            return;
        }else{
            const x:string = localStorage.getItem('todoStorage') || '';
            const some = JSON.parse(x);
            setTasks(some);
            return;
        }

    },[]);
    useEffect(() => {
        window.localStorage.setItem('todoStorage',JSON.stringify(tasks));
    },[tasks]);
    const toggleComplete = (id: number) => {
        setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, complete: !task.complete } : task));
    };

    const deleteTask = (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const deleteCompleteTasks = () => {
        if(window.confirm('you want to delete the complete tasks')){
            setTasks(prevTask => prevTask.filter(task => task.complete === false));
        }else{
            return;
        }
    };

    const changeFilter = (e: "all" | "active" | "complete") => {
        setFilter(e);
    };

    const handleNewTask = (inputTask: string) => {
        setTasks([...tasks, { id: tasks[tasks.length - 1] === undefined ? 1 : tasks[tasks.length - 1].id + 1, text: inputTask, complete: false }]);
    };

    return (
        <div className='ToDo'>
            <div className="head">
                <p>TODO APP</p>
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