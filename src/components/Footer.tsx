import React from "react";
import { Task } from "../types";
export const Footer = ({ tasks, deleteCompleteTasks,filter }: {filter:string, tasks: Array<Task>, deleteCompleteTasks: () => void }) => {
    return (
        <div className="footer-comp">
            <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                <p>Tasks left</p>
                <p>{tasks.filter(items => items.complete === false).length}</p>
            </div>
            <h2 className="footer-filter">Filter: {filter.toUpperCase()}</h2>
            <button onClick={() => deleteCompleteTasks()} >Delete completed tasks </button>
        </div>
    );
};