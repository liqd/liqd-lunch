import axios from 'axios';
import {API_HOST} from './config'
const API_URL = API_HOST.concat('/api/resistance/');

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
