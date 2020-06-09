import axios from 'axios';
import {API_HOST} from './config'
const API_URL = API_HOST.concat('/api/restaurants/');

export default class RestaurantsService{

    //constructor(){}


    getRestaurants() {
        const url = `${API_URL}`;
        return axios.get(url).then(response => response.data);
    }
    getRestaurantsByURL(link){
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
    }
    getRestaurant(pk) {
        const url = `${API_URL}${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteRestaurant(restaurant){
        const url = `${API_URL}${restaurant.pk}`;
        return axios.delete(url);
    }
    createRestaurant(restaurant){
        const url = `${API_URL}`;
        return axios.post(url,restaurant);
    }
    updateRestaurant(restaurant){
        const url = `${API_URL}${restaurant.pk}`;
        return axios.put(url,restaurant);
    }}
