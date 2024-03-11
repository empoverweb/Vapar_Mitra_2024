import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { addProductionPlant, getProductionPlants } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import { DeleteModal } from "@/widgets/modal/deleteModal";

export function AddProductionPlants() {

  let emptyProductionPlants = {
    id: 0,
    name: '',
    code:'',
    location:'',
    address:'',
    remarks:'',
    status: true
  };

  const [tableData, setTableData] = useState(null);
  const [showPopup, setShowPopup] = useState(false)
  const [productionPlants, setproductionPlants] = useState(emptyProductionPlants);
  const [modalHeading,setModalHeading] = useState()
  const [statusValue, setstatusValue] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteProductsDialogVisible, setDeleteProductsDialogVisible] = useState(false);
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  /////API CALL TO GET ALL THE PRODUCTIONPLANTS

  const tableColumns = [
    {
      'field': 'name',
      'header': "ProductionName"
    },
    {
      'field': 'code',
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


    const fetchproductionPlantData = async () => {
      try {
        const apiUrl = getProductionPlants;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.productionPlantList);
      } catch (error) {
        console.error("Error fetching productionplant master data:", error);
      }
    };


useEffect (() =>{
   fetchproductionPlantData()
},[])
   

  // add new record

  const saveProduct = async () => {
    const postData = productionPlants;
    const apiUrl = addProductionPlant;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
  fetchproductionPlantData();
  }

  const handleAddNew = () => {
    setShowPopup(true)
    setproductionPlants(emptyProductionPlants);
    setModalHeading('Add Production Plants');
    setSubmitted(false);
   
  }

  //On Edit/ update
  const handleEdit = (rowData) => {
    console.log(rowData,"roww data of product")
    setShowPopup(true);
    setIsEditMode(true);
    const updatedProduct = {
      ...emptyProductionPlants,
      ...rowData,
    };
    setproductionPlants(updatedProduct);
    setModalHeading('Edit Production Plants');

  }

  //on delete 
  const handleDelete = (rowData) => {
    const updatedProduct = {
      id: rowData.id,
      name: rowData.name,
      code:rowData.code,
      location:rowData.location,
      address:rowData.address,
      remarks:rowData.remarks,
      status: false
    };
    setproductionPlants(updatedProduct);
    setDeleteProductsDialogVisible(true);
  }


  //close the delete modal popup
  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialogVisible(false);
  };

  // on change
  const handleChange = (fieldName, value) => {
    setproductionPlants(prevProduct => ({
      ...prevProduct,
      [fieldName]: value
    }));
  };

  const handleDeleteProduct = async () => { 
    const postData = productionPlants;
    const apiUrl = addProductionPlant;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteProductsDialogVisible(false);
    fetchproductionPlantData()
  };
  
  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add ProductionPlants'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleDownload={true} handleUpload={true}/>
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">
                <FormFields type="text" id="name" label="production Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Name'} value={productionPlants.name} onChange={e => handleChange("name", e.target.value)}  /> 
                <FormFields type="text" id="code" label="production Code" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Code'} value={productionPlants.code} onChange={e => handleChange("code", e.target.value)} /> 
                <FormFields type="text" id="location" label="Location" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Name'} value={productionPlants.location} onChange={e => handleChange("location", e.target.value)} /> 
                <FormFields type="text" id="address" label="Address" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Name'} value={productionPlants.address} onChange={e => handleChange("address", e.target.value)} /> 
              </div>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">
              {isEditMode && (
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
                  selectedValue={statusValue}
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
          <DeleteModal
            visible={deleteProductsDialogVisible}
            header="Confirm"
            hideDeleteProductsDialog={hideDeleteProductsDialog}
            handleDelete={handleDeleteProduct}
            onHide={() => setDeleteProductsDialogVisible(false)}
          />

        </div>
      </div>
    </>
  );
}

export default AddProductionPlants;

