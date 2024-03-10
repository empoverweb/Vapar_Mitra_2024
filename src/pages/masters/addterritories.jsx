
import React, { useState, useEffect, useRef } from 'react';
import { ApiService } from "@/service";
import { getTerritories } from "@/utils";
import PrimeDataTable from '@/widgets/primedatatable';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import Modal from "@/widgets/modal";
import { FormFields } from '@/widgets/FormFields';
import { Button } from "@material-tailwind/react";
export function AddTerritories() {

  

  const [tableData, setTableData] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [product, setproduct] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState('');
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [regionData, setRegionData] = useState([]);
  const [regionPreviousData, setRegionPreviousData] = useState([]);


  /////API CALL TO GET ALL THE PRODUCTS

  const tableColumns = [
    {
      'field': 'territoryName',
      'header': "Territory Name"
    },
    {
      'field': 'region.regionName',
      'header': "Region Name"
    },
    {
      'field': 'id',
      'header': "Zone Code"
    },
    {
      'field': 'status',
      'header': "Status"
    }
  ]



  useEffect(() => {

    const fetchTerritoriesData = async () => {
      try {
        const apiUrl = getTerritories;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.territoryList);
      } catch (error) {
        console.error("Error fetching product master data:", error);
      }
    };

    if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
      fetchTerritoriesData();
      setPreviousData(tableData);
    }
  }, [tableData, previousData]);

  useEffect(() => {

    const fetchRegionData = async () => {
      try {
        const apiUrl = getRegions;
        console.log("url==>"+apiUrl);
        const response = await ApiService.getData(apiUrl);
        setRegionData(response.response.regionList);
      } catch (error) {
        console.error("Error fetching region master data:", error);
      }
    };
  
    if (JSON.stringify(regionPreviousData) !== JSON.stringify(regionData)) {
      fetchRegionData();
      setRegionPreviousData(regionData);
    }
  }, [regionData, regionPreviousData]);
  

  // add new record
  
  const handleAddNew = () => { 
    setShowPopup(true)
  }

  const onSubmit = (data) => {
    alert();
    console.log(data); // This will log the form data to the console
    // Handle form data as needed
  };
   



  //On Edit/ update

  const handleEdit = (rowData) => {
    alert(JSON.stringify(rowData));
    console.log(JSON.stringify(rowData))
    setShowPopup(true)
  }

  const [date, setDate] = useState();
  const handleSelectDate = (selectedDate) => {
    setDate(selectedDate);
  };


  //on delete 

  const handleDelete = (rowData) => {
    alert("delete clicked")
    setShowPopup(true)
  }


  //close the modal popup

  const hideDialog = () => {
    setShowPopup(false);
  };

  //status on change
  const handleStatusChange= (e) => {
    setstatusValue(e.target.value); 
  }

  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Territories'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New Territories"}>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">
                
                <FormFields type="text" id="territoryName" label="Territory Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Zone name'} />
                
                <FormFields type="text" id="regionName" label="Region Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Zone name'} />
                <FormFields type="select" id="regionName" optionsData={tableData} label="Region Id" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Select Region Name'} />
              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">
                          
 
              </div>

              {/* //formfields */}
              <div className='flex justify-center items-center'>
                <Button type='submit' variant="filled" size="md" className='bg-primaryColor'>Save</Button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}


export default AddTerritories;
