import axios from 'axios'


const API = axios.create({ 
    baseURL: 'http://localhost:3000/api'
});

export const getCenter = (id: any) => API.get(`/listings/${id}`);

export const createCenter = (data: any) => API.post('/business/', data);
export const updateCenter = (id: any, data: any) =>  API.put(`/business/${id}`, data);
export const getMyCenter =  (id: any) => API.get(`/mybusiness/${id}`);
export const createService = (data: any) => API.post('/services/', data);