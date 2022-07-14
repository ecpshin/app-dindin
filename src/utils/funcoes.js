import api from "../services/api";
import { getItem } from "./storage";
const config = { headers: { Authorization: 'Bearer ' + getItem('token') } };

export const cadastrar = async (route, data) => {
    try {
        return await api.post(route, data, config);
    } catch {
    }
}