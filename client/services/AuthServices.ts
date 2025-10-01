import axios from "axios";

const API_URL = "http://172.20.10.4:5000/api/auth";

export const login = (email: string, password: string) =>
  axios.post(`${API_URL}/login`, { email, password });

export const register = (fullName: string, email: string, password: string) =>
  axios.post(`${API_URL}/register`, { fullName, email, password });
