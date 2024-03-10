import { CURRENT_ENV, CONFIG } from '@/configs/config';

const  BASE_URL = CONFIG[CURRENT_ENV].BASE_URL;
   
export const getProducts = `${BASE_URL}masters/getProducts`;
export const addProduct = `${BASE_URL}masters/addProducts`;  
export const getRegions = `${BASE_URL}masters/getRegions`;
export const getZones = `${BASE_URL}masters/getZones`;
export const addZones = `${BASE_URL}masters/masters/addZone`;// Insertion API for Zones - Amlan
export const getCrops = `${BASE_URL}masters/getCrops`;//this api is for get cropMaster done by ravi.e
export const addCrops = `${BASE_URL}masters/addCrop`; //this api is for save cropMaster done by ravi.e
export const getStates = `${BASE_URL}masters/getStates`;//this api is for get cropMaster done by ravi.e
export const addStates = `${BASE_URL}masters/addState`;//this api is for get stateMaster done by ravi.e
export const getHybrids = `${BASE_URL}masters/getHybrids`; // This API for get Hybrids done by ravikumar.m
export const getTerritory = `${BASE_URL}masters/getTerritories`; // This API for get Territories done by ravikumar.m
export const getDistricts = `${BASE_URL}masters/getDistricts`; // This API for get Districts done by ravikumar.m
export const getCategories = `${BASE_URL}masters/getCategories`; 
export const getSubCategories = `${BASE_URL}masters/getSubCategories`; 
export const getProductionPlants = `${BASE_URL}masters/getProductionPlants`;
export const getSeasons = `${BASE_URL}masters/getSeasons`;
export const getHeadQuarters = `${BASE_URL}masters/getHeadQuarters`;
export const getRoles = `${BASE_URL}masters/getRoles`;
export const getCountries = `${BASE_URL}masters/getCountries`;
export const getUsers = `${BASE_URL}getUsers`; 
export const login = `${BASE_URL}login`; 
export const addRegion = `${BASE_URL}masters/addRegion`;  

export const addHybrid = `${BASE_URL}masters/addHybrid`; // This API for add Hybrids done by ravikumar.m

