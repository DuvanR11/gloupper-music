import axios from "axios";

const API = axios.create({ 
  baseURL: 'http://localhost:3000/api'
});

export const getUser = (userId: any) => API.get(`/user/${userId}`);
export const updateUser = (id: any, formData: any) =>  API.put(`/user/${id}`, formData);
export const getAllUser = ()=> API.get('/user')
export const followUser = (id: any,data: any)=> API.put(`/user/${id}/follow`, data)
export const unfollowUser = (id: any, data: any)=> API.put(`/user/${id}/unfollow`, data)