import axios from 'axios';

// Mude para o seu IP local (ex: 192.168.x.x) para testar no celular físico
// Se usar o emulador do Android, use 10.0.2.2:3000
const API_URL = 'http://192.168.1.5:3000'; 

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // CRUCIAL para o Passport/Sessions funcionar no mobile
});

export default api;