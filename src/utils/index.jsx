import { useState } from "react";
import { getSeasons } from "./constants";
import { ApiService } from "@/service";
export * from "@/utils/constants";
import { getCrops } from "@/utils"; 


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
            const apiUrl = getSeasons;
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

    console.log("seasonsOptionsData"+JSON.stringify(zonesOptionsData))

    return [zonesOptionsData,fetchZonesMasters]
}
