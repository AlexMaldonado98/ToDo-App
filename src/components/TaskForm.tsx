import React, { useState } from "react";

export const TaskForm = ({ handleNewTask }: { handleNewTask: (e: string) => void }) => {
    const [inputTask, setInputTasks] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTasks(e.target.value);
    };

    const handleCreate = () => {
        if(inputTask !== ''){
            handleNewTask(inputTask);
            setInputTasks('');
        }else{
            return null;
        }
    };

    const okd = (key: string) => {
        if (key === 'Enter') {
            if (inputTask !== '') {
                handleNewTask(inputTask);
                setInputTasks('');
            } else {
                return null;
            }
        }
    };

    return (
        <div className="taskForm">
            <button onClick={() => {
                handleCreate();
            }}>Create Task</button>
            <input onChange={(e) => handleChange(e)} onKeyDown={({ key }) => okd(key)} placeholder='Create new task' value={inputTask} />
        </div>
    );
};