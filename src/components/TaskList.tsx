import React from "react";
import { Task } from "../types";
export const TaskList = ({ tasks,toggleComplete, deleteTask,filter }: {filter:string, tasks: Array<Task>,toggleComplete: (e:number) => void,deleteTask:(e:number) => void}) => {
    let c:Array<Task>;
    if(filter === 'active'){
        c = tasks.filter(i => i.complete === false);
    }else if(filter === 'complete'){
        c = tasks.filter(i => i.complete !== false);
    }else{
        c = tasks;
    }

    return (
        <div className="TASKS">
            {c.map(item => (
                <div className="taskList" key={item.id}>
                    <input defaultChecked={item.complete} onChange={() => toggleComplete(item.id)} type="checkbox" />
                    <p className={item.complete ? 'completed' : ''} key={item.id}>{item.text}</p>
                    <button onClick={() => deleteTask(item.id)} className="buttonDelete" type="button" >X</button>
                </div>
            ))}
        </div>
    );
    /* if(filter === 'all'){
        return (
            <div className="TASKS">
                {tasks.map(item => (
                    <div className="taskList" key={item.id}>
                        <input defaultChecked={item.complete} onChange={() => toggleComplete(item.id)} type="checkbox" />
                        <p key={item.id}>{item.text}</p>
                        <button onClick={() => deleteTask(item.id)} className="buttonDelete" type="button" >X</button>
                    </div>
                ))}
            </div>
        );
    }else if(filter === 'active'){
        return (
            <div>
                {tasks.filter(i => i.complete === false).map(item => (
                    <div className="taskList" key={item.id}>
                        <input defaultChecked={item.complete} onChange={() => toggleComplete(item.id)} type="checkbox" />
                        <p key={item.id}>{item.text}</p>
                        <button onClick={() => deleteTask(item.id)} className="buttonDelete" type="button" >X</button>
                    </div>
                ))}
            </div>
        );
    }else{
        return(
            <div>
                {tasks.filter(i => i.complete !== false).map(item => (
                    <div className="taskList" key={item.id}>
                        <input defaultChecked={item.complete} onChange={() => toggleComplete(item.id)} type="checkbox" />
                        <p key={item.id}>{item.text}</p>
                        <button onClick={() => deleteTask(item.id)} className="buttonDelete" type="button" >X</button>
                    </div>
                ))}
            </div>
        );
    } */

};