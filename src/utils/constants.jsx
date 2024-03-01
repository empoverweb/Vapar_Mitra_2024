import { CURRENT_ENV, CONFIG } from '@/configs/config';

const  BASE_URL = CONFIG[CURRENT_ENV].BASE_URL;
   
export const HybridGetData = `${BASE_URL}unauthorised/gridData?actionType=hybridInfoService&extraParams=CP&start=1&limit=10`;
