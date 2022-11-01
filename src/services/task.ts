import axios from 'axios';
import { Task } from '../types';

const TASK_API_URL = 'http://localhost:3001/api/task';

let formatToken:string;

const setToken = (token:string) => {
    formatToken = `bearer ${token}`;
};

const getAllTaskUser = async () => {
    const config = {
        headers:{
            Authorization: formatToken
        }
    };
    const {data} = await axios.get(TASK_API_URL,config);
    return data;
};

const createTask = async (task:{text:string,complete:boolean}) => {
    const config = {
        headers: {
            Authorization: formatToken
        }
    };
    const { data } = await axios.post(TASK_API_URL,task,config);
    return data;
};

const deleteTask = async (id:number) => {
    const config = {
        headers:{
            Authorization: formatToken
        }
    };

    const {data} = await axios.delete(`${TASK_API_URL}/${id}`,config);
    return data;
};

const updateTask = async (taskToUpdate:Task) => {
    const config = {
        headers: {
            Authorization: formatToken
        }
    };

    const newTaskUpdate = {
        text:taskToUpdate.text,
        complete: !taskToUpdate.complete
    };
    const {data} = await axios.put(`${TASK_API_URL}/${taskToUpdate.id}`,newTaskUpdate,config);
    return data;
};
 
export default {
    setToken,
    getAllTaskUser,
    createTask,
    deleteTask,
    updateTask
};