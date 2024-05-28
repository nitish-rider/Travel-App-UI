import axios from "axios";

const BASE_API_URL = "http://localhost:3001/v1"

let headers = {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + sessionStorage.getItem('token')
};

export const loginService = async (body) => {
    return await axios.post(`${BASE_API_URL}/auth/login`, body, {
        headers: headers,
    });
}

export const getAllSuggestedPlacesService = async (body) => {
    return await axios.get(`${BASE_API_URL}/planner/places`, {
        headers: headers,
    });
}

export const getPlaceSuggestionService  = async (body) => {
    return await axios.post(`${BASE_API_URL}/planner/places/suggest`, body,{
        headers: headers,
    });
}