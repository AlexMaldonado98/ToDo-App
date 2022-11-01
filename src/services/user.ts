import axios from "axios";

const CREATE_USER_URL = 'http://localhost:3001/api/user';

const createUser = async (dataUser:{username:string,password:string}) => {
    const {data} = await axios.post(CREATE_USER_URL,dataUser);
    return data;
};

export default {
    createUser
};