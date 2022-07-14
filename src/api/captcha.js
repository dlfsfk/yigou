import axios from '@/axios';
export async function getCaptcha(phone){
    return axios.get('/getCaptcha', { params: { phone } });
}