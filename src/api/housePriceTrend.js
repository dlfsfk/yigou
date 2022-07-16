import axios from '@/axios';

export async function getHousePriceTrend(city, area) {
    return axios.get('/housePriceTrend', { params: { city, area } });
};