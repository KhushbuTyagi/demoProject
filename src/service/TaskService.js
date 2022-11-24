import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";
export const getTaskList = () => {
    return axios.get(`${API_BASE_URL}/tasks`)
}
export const addTask = (data) => {
    return axios.post(`${API_BASE_URL}/saveTask`, data)
}
export const removeTask = (data) => {
    return axios.delete(`${API_BASE_URL}/deleteTask/${data}`)
}
export const  upgradeTask = (data) => {
    return axios.put(`${API_BASE_URL}/saveTask`, data);
}