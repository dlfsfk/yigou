import axios from '@/axios';

export async function searchHouse(page) {
    return axios.get('/searchHouse', { params: { page } });
};