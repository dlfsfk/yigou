import axios from '@/axios';
export async function predictHouseTrend(city){
    return axios.get('/predictHouseTrend', { params: { city } });
}