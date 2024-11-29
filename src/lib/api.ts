import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export const auth = {
  login: (data: { email: string; password: string; role: string }) =>
    api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
};

export const patients = {
  getProfile: () => api.get('/patients/profile'),
  updateProfile: (data: any) => api.put('/patients/profile', data),
  getAppointments: () => api.get('/patients/appointments'),
};

export const doctors = {
  getAll: () => api.get('/doctors'),
  getProfile: () => api.get('/doctors/profile'),
  updateProfile: (data: any) => api.put('/doctors/profile', data),
  getAppointments: () => api.get('/doctors/appointments'),
  getAvailability: (id: string) => api.get(`/doctors/${id}/availability`),
};

export const appointments = {
  create: (data: any) => api.post('/appointments', data),
  update: (id: string, data: any) => api.put(`/appointments/${id}`, data),
  get: (id: string) => api.get(`/appointments/${id}`),
};

export default api;