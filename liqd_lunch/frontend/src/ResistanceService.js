import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ResistanceService{

    //constructor(){}


    getResistances() {
        const url = `${API_URL}/api/resistance/`;
        return axios.get(url).then(response => response.data);
    }
    getResistancesByURL(link){
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
    }
    createResistance(resistance){
        const url = `${API_URL}/api/resistance/`;
        return axios.post(url,resistance);
    }}
