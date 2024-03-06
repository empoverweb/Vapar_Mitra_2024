import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { getDistricts } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
export function AddDistrict() {

  const [tableData, setTableData] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [district, setdistrict] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState();
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE PRODUCTS

  const tableColumns = [
    {
      'field': 'districtCode',
      'header': "District Code"
    },
    {
      'field': 'districtName',
      'header': "District Name"
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



  useEffect(() => {

    const fetchDistrictsData = async () => {
      try {
        const apiUrl = getDistricts;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.districtList);
      } catch (error) {
        console.error("Error fetching product master data:", error);
      }
    };

    if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
      fetchDistrictsData();
      setPreviousData(tableData);
    }
  }, [tableData, previousData]);


  // add new record

  let emptyDistrict = {
    id: 0,
    districtName: '',
    districtCode: '',
    status: true
  };

  const onSubmit = (data) => {
    setdistrict(emptyDistrict);
    setSubmitted(false);
    setShowPopup(true)
  }

  const handleAddNew = () => {
    setdistrict(emptyDistrict);
    setSubmitted(false);
    setShowPopup(true)
  }


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
          <PrimeDataTable tableHeading={'Add District'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New District"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              
                   <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                 <FormFields type="text" id="districtCode" label="Country Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter First name'} />

                   <FormFields type="text" id="districtName" label="State Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Last Name'} />

                  </div>
                    <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="districtCode" label="District Code" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter First name'} />

                <FormFields type="text" id="districtName" label="District Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Last Name'} />

              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                {/* <FormFields type="number" id="packUnit" label="Pack Unit" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter First name'} /> */}

                <FormFields
                  label="Status"
                  type="statusDropdown"
                  size="lg"
                  color="teal"
                  id="status"
                  placeholder="status"
                  error={true}
                  register={register}
                  errors={errors}
                  RequiredErrorMsg={"slect status"}
                  onChange={handleStatusChange}
                  selectedValue={statusValue}
                />

 
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

export default AddDistrict;

