
import React, { useState, useEffect, useRef } from 'react';
import { ApiService } from "@/service";
import { getZones } from "@/utils";
import PrimeDataTable from '@/widgets/primedatatable';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import Modal from "@/widgets/modal";
import { FormFields } from '@/widgets/FormFields';
import { Button } from "@material-tailwind/react";
export function AddZones() {



  const [tableData, setTableData] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [zone, setZone] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE PRODUCTS

  const tableColumns = [
    {
      'field': 'zoneName',
      'header': "Zone Name"
    },
    {
      'field': 'status',
      'header': "Status"
    }
  ]



  useEffect(() => {

    const fetchZoneData = async () => {
      try {
        const apiUrl = getZones;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.zoneList);
      } catch (error) {
        console.error("Error fetching product master data:", error);
      }
    };

    if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
      fetchZoneData();
      setPreviousData(tableData);
    }
  }, [tableData, previousData]);


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
  const handleStatusChange = (e) => {
    setstatusValue(e.target.value);
  }

  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Zone'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New Zone"}>
            <form onSubmit={handleSubmit(saveZones)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                <FormFields type="text" id="zoneName" label="Zone Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Zone name'} />

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
                    value={product.status}
                    selectedValue={product.status}
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
