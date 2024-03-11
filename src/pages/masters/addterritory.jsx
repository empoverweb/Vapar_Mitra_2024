import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { addTeritory, getTerritory, useRegions } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import { DeleteModal } from "@/widgets/modal/deleteModal";
export function AddTerritory() {
  let emptyTerritory = {
    id: 0,
    name: '',
    regionId: '',
    status: true,
    remarks: ''
  };

  const [tableData, setTableData] = useState(null);
  const [showPopup, setShowPopup] = useState(false)
  const [territory, setterritory] = useState(emptyTerritory);
  const toast = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [regionOptionsData, fetchRegionMasters] = useRegions();
  const [deleteProductsDialogVisible, setDeleteProductsDialogVisible] = useState(false);

  /////API CALL TO GET ALL THE PRODUCTS
  const tableColumns = [
    {
      'field': 'name',
      'header': "Territory Name"
    },
    {
      'field': 'region.name',
      'header': "Region Name"
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

    const fetchTerritoryData = async () => {
      try {
        const apiUrl = getTerritory;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.territoryList);
      } catch (error) {
        console.error("Error fetching product master data:", error);
      }
    };

   useEffect(() =>{
       fetchTerritoryData()
   },[territory])

// add new record
  const handleAddNew = () => {  
    fetchRegionMasters()
    setterritory(emptyTerritory);
    setSubmitted(false);
    setShowPopup(true)
    setmodalHeading('Add Territory');
  }

  const saveTeritory = async () => {
    const postData = territory;
    const apiUrl = addTeritory;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
    fetchTerritoryData();
  }


  //On Edit/ update

  const handleEdit = (rowData) => {

    console.log(rowData,"roww data of teritory")
    const updatedTeritory = {
      ...emptyTerritory,
      ...rowData,
      regionId: rowData.region.id
    };
    fetchRegionMasters()
    setShowPopup(true)
    setterritory(updatedTeritory);
    setIsEditMode(true);
    setmodalHeading('Edit Product');  
  
  }

  const handleDelete = (rowData) => {
    console.log(rowData,"delete row data")
    // Create a new object with the relevant fields and set the status to false
    const updatedTeritory = {
      id: rowData.id,
      name: rowData.name,
      regionId: rowData.region.id,
      remarks: rowData.remarks,
      status: false
    };
    setterritory(updatedTeritory);
    setDeleteProductsDialogVisible(true);
    // Set the delete modal visible
  }

  const handleDeleteProduct = async () => { 
    const postData = territory;
    const apiUrl = addTeritory;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteProductsDialogVisible(false);
    fetchTerritoryData();
  };

  //close the modal popup
  const handleChange = (fieldName, value) => {
    setterritory(prevTeritory => ({
      ...prevTeritory,
      [fieldName]: value
    }));

    console.log(prevTeritory,"onChange value")
  };
  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Territory'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleDownload={true} handleUpload={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New Territory"}>
            <form onSubmit={handleSubmit(saveTeritory)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="name" label="Territory Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter First name'} value={territory.name} onChange={e => handleChange("name", e.target.value)}  />
                <FormFields type="dropdown" id="regionId" label="Region Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter First name'} selectedValue={territory.regionId} optionsData={regionOptionsData} onChange={e => handleChange("regionId", e.target.value)} />
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
                  onChange={e => handleChange("status", e.target.value)}
                  selectedValue={territory.status}
                />
              )}
              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">
              <FormFields type="textarea" id="remarks" label="Remarks" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter First name'} onChange={e => handleChange("remarks", e.target.value)} />
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
            // hideDeleteProductsDialog={hideDeleteProductsDialog}
            handleDelete={handleDeleteProduct}
            // item={product.productName}
            onHide={() => setDeleteProductsDialogVisible(false)}
          />
        </div>
      </div>
    </>
  );
}

export default AddTerritory;

