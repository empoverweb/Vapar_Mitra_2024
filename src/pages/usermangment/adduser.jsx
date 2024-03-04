import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState , useEffect} from 'react';  
export function AddUser() { 
 
  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
          <div class="flex items-center justify-between">
            <div>
              <h5
                class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Users list
              </h5>
              <p class="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                See information about all users
              </p>
            </div> 
          </div> 
        </div>
        <div class="p-6 px-0">
             {/* //table ccode */}
             <PrimeDataTable/>
        </div>  
      </div>
    </>
  );
}

export default AddUser;
