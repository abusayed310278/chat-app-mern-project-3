import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // API base URL
  withCredentials: true, // Send cookies with requests (needed for auth)
});

