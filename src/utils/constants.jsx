import { CURRENT_ENV, CONFIG } from '@/configs/config';

const  BASE_URL = CONFIG[CURRENT_ENV].BASE_URL;
   
export const getProducts = `${BASE_URL}masters/getProducts`;
export const addProduct = `${BASE_URL}masters/addProducts`;
export const getSeasons = `${BASE_URL}masters/getSeasons`



