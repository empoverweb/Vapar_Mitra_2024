import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal"; 
import { Button } from "@material-tailwind/react";
import { getRegions, getZones } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';


export function AddRegion() { 
  
  const [tableData, setTableData] = useState(null);
  const [showPopup,setShowPopup] = useState(false)
  const [previousData, setPreviousData] = useState([]);
  const [regionName, setRegionName] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState('');
  const [zoneMaster, setZoneMaster] = useState(false);
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  const tableColumns = [
    {
      'field': 'regionName',
      'header': "Region Name"
    },
    ,
    {
      'field': 'status',
      'header': "Status"
    }
  ]


  useEffect(() => {

    const fetchProductsData = async () => {
      try {
        const apiUrl = getRegions;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.regionList);
      } catch (error) {
        console.error("Error fetching product master data:", error);
      }
    };

    if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
      fetchProductsData();
      setPreviousData(tableData);
    }
  }, [tableData, previousData]);


  const fetchZoneData = async () => {
    try {
      const apiUrl = getZones;
      const response = await ApiService.getData(apiUrl);

      const result = JSON.stringify(response)
      // console.log("Zones Data"+result)

      setZoneMaster(response.response.zoneList);
    } catch (error) {
      console.error("Error fetching product master data:", error);
    }
  };
  useEffect(()=>{
    fetchZoneData()
  },[])

console.log(zoneMaster,"api response")


    // add new record
  
  const handleAddNew = () => { 
    setShowPopup(true)

  }

  const onSubmit = () => {
    alert("Data Saved");
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

  const productDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check"  />
    </React.Fragment>
);

const handleRegionName = (e) => {
  setRegionName(e.target.value)
}
  
 console.log("regionName "+regionName);
return (
  <>
    <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
      <div class="p-0 px-0">
        <Toast ref={toast} />
        <PrimeDataTable tableHeading={'Add Region'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
        <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New Region"}>
          <form onSubmit={onSubmit}>

            <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

              <FormFields type="text" onChange={handleRegionName} id="regionName" label="Region Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Region name'} />

              <FormFields type="select" id="zoneId" optionsData={zoneMaster} label="Zone Id" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Select Zone Id'} />

            </div>

            <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

              <FormFields type="text" id="remarks" label="Remarks" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Remarks'} />
              <FormFields type="statusDropdown" id="status" label="Status" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Pack Unit'} />
             

            </div>

            {/* //formfields */}
            <div className='flex justify-center items-center'>
              <Button type='submit'  variant="filled" size="md" className='bg-primaryColor'>Save</Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  </>
);
}

export default AddRegion;