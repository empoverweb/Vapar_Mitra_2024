import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { getProductionPlants } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';

export function AddProductionPlants() {

  const [tableData, setTableData] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [productionPlants, setproductionPlants] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState();
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE PRODUCTIONPLANTS

  const tableColumns = [
    {
      'field': 'productionName',
      'header': "ProductionName"
    },
 
    {
      'field': 'productionCode',
      'header': "ProductionCode"
    },
    {
      'field': 'location',
      'header': "Location"
    },

    {
        'field': 'address',
        'header': "Address"
      },
    {
      'field': 'status',
      'header': "Status"
    }
  ]



  useEffect(() => {

    const fetchproductionPlantData = async () => {
      try {
        const apiUrl = getProductionPlants;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.productionPlantList);
      } catch (error) {
        console.error("Error fetching productionplant master data:", error);
      }
    };

    if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
        fetchproductionPlantData();
      setPreviousData(tableData);
    }
  }, [tableData, previousData]);


  // add new record

  let emptyProductionPlants = {
    id: 0,
    productionPlants: '',
    productionCode:'',
    location:'',
    address:'',
    remarks:'',
    status: true
  };

  const onSubmit = (data) => {
    setproductionPlants(emptyProductionPlants);
    setSubmitted(false);
    setShowPopup(true)
  }

  const handleAddNew = () => {
    setproductionPlants(emptyProductionPlants);
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
          <PrimeDataTable tableHeading={'Add ProductionPlants'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New ProductionPlants"}>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="productionName" label="production Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Name'} />
                <FormFields type="text" id="productionCode" label="production Code" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Code'} />
                <FormFields type="text" id="location" label="Location" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Name'} />
                <FormFields type="text" id="address" label="Address" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Name'} />
                <FormFields type="text" id="remarks" label="Remarks" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Remarks'} />


              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">


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

export default AddProductionPlants;

