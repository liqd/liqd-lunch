import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ResistanceService{

    constructor(){}


    getResistances() {
        const url = `${API_URL}/api/resistance/`;
        return axios.get(url).then(response => response.data);
    }
    getResistancesByURL(link){
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
    }
    getResistance(pk) {
        const url = `${API_URL}/api/resistance/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteResistance(resistance){
        const url = `${API_URL}/api/resistance/${resistance.pk}`;
        return axios.delete(url);
    }
    createResistance(resistance){
        const url = `${API_URL}/api/resistance/`;
        return axios.post(url,resistance);
    }
    updateResistance(resistance){
        const url = `${API_URL}/api/resistance/${resistance.pk}`;
        return axios.put(url,resistance);
    }}
