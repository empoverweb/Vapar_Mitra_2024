import { CURRENT_ENV, CONFIG } from '@/configs/config';

const  BASE_URL = CONFIG[CURRENT_ENV].BASE_URL;
   
export const addDistrict = `${BASE_URL}VyaparMitra/rest/nsl/addDistricts`;
