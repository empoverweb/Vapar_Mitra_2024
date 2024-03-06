import { CURRENT_ENV, CONFIG } from '@/configs/config';

const  BASE_URL = CONFIG[CURRENT_ENV].BASE_URL;
   
export const getProducts = `${BASE_URL}masters/getProducts`;
export const addProduct = `${BASE_URL}masters/addProducts`;
export const getSeasons = `${BASE_URL}masters/getSeasons`


export const getRegions = `${BASE_URL}masters/getRegions`;
export const getZones = `${BASE_URL}masters/getZones`;
export const getCrops = `${BASE_URL}masters/getCrops`;//this api is for get cropMaster done by ravi.e
export const getStates = `${BASE_URL}masters/getStates`;//this api is for get cropMaster done by ravi.e

