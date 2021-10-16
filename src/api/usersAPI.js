import axios from "axios";

const url = "http://localhost:3000/users";
const authURL = "http://localhost:3000/auth";

export const getAllUsers = () => axios.get(url);
export const getUser = (id) => axios.get(`http://localhost:3000/user/${id}`);
export const createUser = (userObj) => axios.post(`${authURL}/user-create`, userObj);
export const loginUser = (userObj) => axios.post(`${authURL}/user-login`, userObj);
export const updateUser = (id, userObj) => axios.put(`${url}/user-update/${id}`, userObj);
export const deleteUser = (id) => axios.delete(`${url}/user-delete/${id}`);
