import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState , useEffect} from 'react';  
export function AddUser() { 
 
  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border"> 
        <div class="p-0 px-0"> 
             <PrimeDataTable/>
        </div>  
      </div>
    </>
  );
}

export default AddUser;
