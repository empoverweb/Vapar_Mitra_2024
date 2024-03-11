import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { DeleteModal } from "@/widgets/modal/deleteModal";
import { Button } from "@material-tailwind/react";
import { getCrops, addCrops } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';

export function AddCrop() {
  let emptyCrop = {
    id: 0,
    name: '',
    code: '',
    remarks: '',
    status: true
  };

  const [tableData, setTableData] = useState(null);
  const [showPopup, setShowPopup] = useState(false)
  const [crop, setCrop] = useState(emptyCrop);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalHeading, setmodalHeading] = useState('');
  const [deleteCropsDialogVisible, setDeleteCropsDialogVisible] = useState(false);
  const toast = useRef(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  /////API CALL TO GET ALL THE Crops
  const tableColumns = [
    {
      'field': 'name',
      'header': "Crop Name"
    },
    {
      'field': 'code',
      'header': "Crop Code"
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

  //get all crops api
  useEffect(() => {
    fetchCropsData();
  }, [crop]);


  const fetchCropsData = async () => {
    try {
      const apiUrl = getCrops;
      const response = await ApiService.getData(apiUrl);
      setTableData(response.response.cropsList);
    } catch (error) {
      console.error("Error fetching crops master data:", error);
    }
  };

  ///add new recrod 
  const handleAddNew = () => {
    setCrop(emptyCrop);
    setmodalHeading('Add Crop');
    setShowPopup(true);
    setIsEditMode(false)
  }
  const saveCrop = async () => {
    const postData = crop;
    const apiUrl = addCrops;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
    fetchCropsData();
  }

  //On Edit/ update
  const handleEdit = (rowData) => {
    console.log(rowData,"selected row data")
    const updatedCrop = {
      ...emptyCrop,
      ...rowData,
    };
    setCrop(updatedCrop);
    setIsEditMode(true);
    setmodalHeading('Edit Crop');
    setShowPopup(true);
  }

  //on delete crops

  const handleDelete = (rowData) => {
    // Create a new object with the relevant fields and set the status to false
    const updatedCrop = {
      id: rowData.id,
      name: rowData.name,
      code: rowData.code,
      remarks: rowData.remarks,
      status: false
    };

    setCrop(updatedCrop);
    // Set the delete modal visible
    setDeleteCropsDialogVisible(true);
  }

  const handleDeleteCrop = async () => {
    const postData = crop;
    const apiUrl = addCrops;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteCropsDialogVisible(false);
    fetchCropsData();
  };

  const hideDeleteCropsDialog = () => {
    setDeleteCropsDialogVisible(false);
  };

  ///onchange to update the new value
  const handleChange = (fieldName, value) => {
    setCrop(prevCrop => ({
      ...prevCrop,
      [fieldName]: value
    }));
  };
  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Crop'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleDownload={true} handleUpload={true}/>
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveCrop)}>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-6">
                <FormFields type="text" id = "name"  label="crop Name" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter crop name'} value={crop.name} onChange={(e) => handleChange("name", e.target.value)} />
                <FormFields type="text" id="code" label="crop Code" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Pack Size'} value={crop.code} onChange={(e)=> handleChange("code", e.target.value)} />
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
                    selectedValue={crop.status}
                    onChange={e => handleChange("status", e.target.value)}
                  />
                )}
              </div>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-6">
                <FormFields type="textarea" id="remarks" label="Remarks" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Pack Unit'} value={crop.remarks} onChange={(e) => handleChange("remarks", e.target.value)} />
              </div>
              {/* //formfields */}
              <div className='flex justify-center items-center'>
                <Button type='submit' variant="filled" size="md" className='bg-primaryColor'>
                  {isEditMode ? 'Update' : 'Save'}
                </Button>
              </div>
            </form>
          </Modal>

           {/* ///delete modal component loading */}
           <DeleteModal
            visible={deleteCropsDialogVisible}
            header="Confirm"
            hideDeleteCropsDialog={hideDeleteCropsDialog}
            handleDelete={handleDeleteCrop}
            item={crop.name}
          />

          {/* ///delete modal component loading */}

        </div>
      </div>
    </>
  );
}

export default AddCrop;
