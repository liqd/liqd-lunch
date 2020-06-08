import axios from 'axios';
const API_URL = '/api/resistance/';

export default class ResistanceService{

    //constructor(){}


    getResistances() {
        const url = `${API_URL}`;
        return axios.get(url).then(response => response.data);
    }
    getResistancesByURL(link){
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
    }
    createResistance(resistance){
        const url = `${API_URL}`;
        return axios.post(url,resistance);
    }}
