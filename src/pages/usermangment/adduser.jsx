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
            <div class="flex flex-col gap-2 shrink-0 sm:flex-row"> 
              <button
                class="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                  stroke-width="2" class="w-4 h-4">
                  <path
                    d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                  </path>
                </svg>
                Add member
              </button>
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
