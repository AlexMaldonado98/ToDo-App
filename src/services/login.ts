import axios from 'axios';
const loginUrl = 'http://localhost:3001/api/login';

const login = async (infoUser:{username:string,password:string}) => {
    const {data} = await axios.post(loginUrl,infoUser);
    return data;
}; 

export default login;