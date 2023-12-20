import axios from 'axios'


const API = axios.create({ 
    baseURL: 'http://localhost:3000/api'
});
    
export const getMessages = (id: any) => API.get(`/message/${id}`);
export const addMessage = (data: any) => API.post('/message/', data);