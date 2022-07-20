import axios from '@/axios';

export async function searchHouse(page) {
    return axios.get('/searchHouse', { params: { page } });
};

export async function searchHouseByArea(page, max, min) {
    return axios.get('/searchHouseByArea', { params: { page, max, min } });
};

export async function searchHouseByPrice(page, max, min) {
    return axios.get('/searchHouseByPrice', { params: { page, max, min } });
};