import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class RestaurantsService{

    constructor(){}


    getRestaurants() {
        const url = `${API_URL}/api/restaurants/`;
        return axios.get(url).then(response => response.data);
    }
    getRestaurantsByURL(link){
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
    }
    getRestaurant(pk) {
        const url = `${API_URL}/api/restaurants/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteRestaurant(restaurant){
        const url = `${API_URL}/api/restaurants/${restaurant.pk}`;
        return axios.delete(url);
    }
    createRestaurant(restaurant){
        const url = `${API_URL}/api/restaurants/`;
        return axios.post(url,restaurant);
    }
    updateRestaurant(restaurant){
        const url = `${API_URL}/api/restaurants/${restaurant.pk}`;
        return axios.put(url,restaurant);
    }}
