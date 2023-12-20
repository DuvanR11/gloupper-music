import axios from 'axios'


const API = axios.create({ 
    baseURL: 'http://localhost:3000/api'
});

export const createChat = (data: any) => API.post('/chat/', data);
export const userChats = (id: any) => API.get(`/chat/${id}`);
export const findChat = (firstId: any, secondId: any) => API.get(`/chat/find?senderId=${firstId}&receiverId=${secondId}`);