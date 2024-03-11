
import React, { useState, useEffect, useRef } from 'react';
import { ApiService } from "@/service";
import { addZones, getZones } from "@/utils";
import PrimeDataTable from '@/widgets/primedatatable';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import Modal from "@/widgets/modal";
import { FormFields } from '@/widgets/FormFields';
import { Button } from "@material-tailwind/react";
export function AddZones() {
  
  let emptyZones = {
    id: 0,
    name: '',
    remarks: '',
    status: true
  };


  const [tableData, setTableData] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [zone, setZone] = useState(emptyZones);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalHeading, setmodalHeading] = useState('');
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE PRODUCTS

  const tableColumns = [
    {
      'field': 'name',
      'header': "Zone Name"
    },
    {
      'field': 'remarks',
      'header': "Remarks"
    },
    {
      'field': 'status',
      'header': "Status"
    }
  ]


    const fetchZoneData = async () => {
      try {
        const apiUrl = getZones;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.zoneList);
      } catch (error) {
        console.error("Error fetching product master data:", error);
      }
    };

    useEffect(() =>{
      fetchZoneData()
    },[])
    

  // add new record
  const handleAddNew = () => {
    setShowPopup(true)
  }

  const saveZones = async () => {
    const postData = zone;
    const apiUrl = addZones;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
    fetchZoneData();
  }

  
  //On Edit/ update

  const handleEdit = (rowData) => {
    console.log(rowData,"selected row data")
    const updatedCrop = {
      ...emptyZones,
      ...rowData,
    };
    setZone(updatedCrop);
    setIsEditMode(true);
    setmodalHeading('Edit Zones');
    setShowPopup(true);
  }


  //on delete 

  const handleDelete = (rowData) => {
    alert("delete clicked")
    setShowPopup(true)
  }

  // on change
  const handleChange = (fieldName, value) => {
    setZone(prevZone => ({
      ...prevZone,
      [fieldName]: value
    }));
  };

  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Zone'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveZones)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-6">
                <FormFields type="text" id="name" label="Zone Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Zone name'} value={zone.name} onChange={(e) => handleChange("name", e.target.value)} />
              </div>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-6">   
                <FormFields type="text" id="remarks" label="Remarks" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Zone name'} value={zone.remarks} onChange={(e) => handleChange("remarks", e.target.value)} />
              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                {isEditMode && (
                  <FormFields
                    type="statusDropdown"
                    id="status"
                    label="Status"
                    size="md"
                    color="teal"
                    error={true}
                    register={register}
                    errors={errors}
                    RequiredErrorMsg={'Select Status'}
                    selectedValue={zone.status}
                    onChange={e => handleChange("status", e.target.value)}
                  />
                )}


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


export default AddZones;
