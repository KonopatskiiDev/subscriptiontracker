import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://subscriptiontracker-production-77ef.up.railway.app',
    withCredentials: true,
})