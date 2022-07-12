import axios from '@/axios';

export async function getHousePriceTreand(province, city) {
    return axios.get('/housePriceTreand', { province, city });
};