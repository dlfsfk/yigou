import axios from '@/axios';
export async function getRankData(city) {
    return axios.get('/rank', { params: { city } });
}