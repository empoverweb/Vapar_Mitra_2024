import { useState } from "react";
import { getSeasons,getCountries,getZones,getCrops} from "./constants";
import { ApiService } from "@/service";
export * from "@/utils/constants"; 


export const statusDropdown = () => {
    return [
        {
            id: 1,
            name: "Active",
            value: true
        },
        {
            id: 0,
            name: "In-Active",
            value: false
        }
    ];
}

export const packUnits = () => {
    return [
        {
            id: 1,
            name: "Kg",
            value: "Kg"
        },
        {
            id: 2,
            name: "gm",
            value: "gm"
        },
        {
            id: 3,
            name: "ltr",
            value: "ltr"
        },
        {
            id: 4,
            name: "ml",
            value: "ml"
        }
    ];
} 

//seasons dropdwon master data
export const useGetSeasons = () =>{
    const [seasonsMaster,setSeasonsMasters] = useState([])
    const fetchSeasondMasters = async() =>{
        try{
            const apiUrl = getSeasons;
            const response = await ApiService.getData(apiUrl);
           console.log(response,"seasons data");
           setSeasonsMasters(response.response.seasonList);
        } catch(error){
            console.error("Error fetching seasons data",error)
        }
    }
   const seasonsOptionsData = seasonsMaster.filter((status) => (!status === false)).map((season) => ({
    id: season.id,
    name:season.seasonName
}))

    console.log("seasonsOptionsData"+JSON.stringify(seasonsOptionsData))

    return [seasonsOptionsData,fetchSeasondMasters]
}

//Zone dropdwon master data Done By Nagendra
export const useGetZones = () =>{
    const [zonesMaster,setZonesMasters] = useState([])
    const fetchZonesMasters = async() =>{
        try{
            const apiUrl = getZones;
            const response = await ApiService.getData(apiUrl);
           console.log(response,"Zone data");
           setZonesMasters(response.response.zoneList);
        } catch(error){
            console.error("Error fetching zone data",error)
        }
    }
   const zonesOptionsData = zonesMaster.filter((status) => (!status === false)).map((zone) => ({
    id: zone.id,
    name:zone.zoneName
}))

//     console.log("seasonsOptionsData"+JSON.stringify(zonesOptionsData))

    return [zonesOptionsData,fetchZonesMasters]
}

//country dropdwon master Done By Ravi.e
export const useGetCountries = () =>{
    const [countryMaster,setCountryMasters] = useState([])
    const fetchcountryMasters = async() =>{
        try{
            const apiUrl = getCountries;
            const response = await ApiService.getData(apiUrl);
           console.log(response,"country data");
           setCountryMasters(response.response.countryList);
        } catch(error){
            console.error("Error fetching country data",error)
        }
    }
   const countryOptionsData = countryMaster.filter((status) => (!status === false)).map((country) => ({
    id: country.id,
    name:country.countryName
}))

    console.log("countryOptionsData"+JSON.stringify(countryOptionsData))

    return [countryOptionsData,fetchcountryMasters]
}

export const useGetCrops = () => {
    const [cropMasters, setCropMasters] = useState([]);
    const fetchCropMasters = async () => {
      try {
        const apiUrl = getCrops;
        const response = await ApiService.getData(apiUrl);
        console.log(response,"crops data ")
        setCropMasters(response.response.cropsList);
      } catch (error) {
        console.error("Error fetching regions data:", error);
      }
    };
    const cropOptionsData = cropMasters.filter((status) => (!status === false)).map(crop => ({
        id: crop.id,
        name: crop.cropName,
      }));
    return [cropOptionsData, fetchCropMasters];
  };
 
