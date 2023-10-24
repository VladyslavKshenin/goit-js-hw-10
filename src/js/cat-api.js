import axios from "axios";

const API_KEY = "live_wOUnTomFCN2fp6YaxMAOEuQ6d9axKHSDlWpe2ZXnsYhQ9E5V2HcMp6NeRn89Ye9Z";
const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common["x-api-key"] = API_KEY; 

function fetchBreeds() {
    const END_POINT = '/breeds';

    return fetch(`${BASE_URL}${END_POINT}?${axios}`)
    .then(response => {
        if (!response.ok) {
        throw new Error(response.status || 'Forcefully return to СATCH');
        }
        return response.json();
    })
}

function fetchCatByBreed(breedId) {
    const END_POINT = '/images/search';

    return fetch(`${BASE_URL}${END_POINT}?breed_ids=${breedId}`)
    .then(response => {
        if (!response.ok) {
        throw new Error(response.status || 'Forcefully return to СATCH');
        }
        return response.json();
    })


}


module.exports = { fetchBreeds, fetchCatByBreed };