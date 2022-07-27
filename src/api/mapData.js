import axios from '@/axios';
export async function getProvinceData() {
    return axios.get('/province');
}

export async function getCityData(province) {
    return axios.get('/city', { params: { province } });
}

export async function getCountyData(county) {
    return axios.get('/county', { params: { county } });
}