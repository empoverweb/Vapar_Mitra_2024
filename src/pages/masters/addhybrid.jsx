import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { DeleteModal } from "@/widgets/modal/deleteModal";
import { Button } from "@material-tailwind/react";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import { getHybrids, addHybrid, useGetCrops, } from "@/utils";
 
export function AddHybrid() {

  let emptyHybrid = {
    id: 0,
    name: '',
    code: '',
    remarks: '',
    cropId: '',
    status: true
  };


  const [tableData, setTableData] = useState(null);
  const [hybrid, sethybrid] = useState(emptyHybrid);
  const [showPopup, setShowPopup] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalHeading, setmodalHeading] = useState('');
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [deleteHybridsDialogVisible, setDeleteHybridssDialogVisible] = useState(false);
  const [cropOptionsData,fetchCropMasters] = useGetCrops()


  /////API CALL TO GET ALL THE HYBRIDS

  const tableColumns = [
    {
      'field': 'name',
      'header': "Hybrid Name"
    },
    {
      'field': 'code',
      'header': "Hybrid Code"
    },
    {
      'field': 'remarks',
      'header': "Remarks"
    },
    {
      'field': 'crop.name',
      'header': "Crop Name"
    },
    {
      'field': 'status',
      'header': "Status"
    }
  ]
  //get all Hybrids api
  useEffect(() => {
    fetchHybridsData();
  }, [hybrid]);

  const fetchHybridsData = async () => {
    try {
      const apiUrl = getHybrids;
      const response = await ApiService.getData(apiUrl);
      setTableData(response.response.hybridsList);
    } catch (error) {
      console.error("Error fetching hybrid master data:", error);
    }
  };

    ///add new recrod 

    const handleAddNew = () => {
      sethybrid(emptyHybrid);
      setmodalHeading('Add Hybrid');
      setShowPopup(true);
      setIsEditMode(false)
      fetchCropMasters();
    }

  const saveHybrid = async () => {
    const postData = hybrid;
    const apiUrl = addHybrid;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
    fetchHybridsData();
  }

  //On Edit/ update
  const handleEdit = (rowData) => {
    console.log(rowData,"{hybrid row data")
    const updatedHybrid = {
      ...emptyHybrid,
      ...rowData,
      cropId: rowData.crop.name
    };
    sethybrid(updatedHybrid);
    fetchCropMasters();
    setIsEditMode(true);
    setShowPopup(true);
  }

  //on delete hybrid
  const handleDelete = (rowData) => {
    // Create a new object with the relevant fields and set the status to false
    const updatedHybrid = {
      id: rowData.id,
      name: rowData.name,
      code: rowData.code,
      remarks: rowData.remarks,
      cropId: rowData.crop.id,
      status: false
    };

    sethybrid(updatedHybrid);
    // Set the delete modal visible
    setDeleteHybridssDialogVisible(true);

  }

  const handleDeleteHybrid = async () => { 
    const postData = hybrid;
    const apiUrl = addHybrid;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteHybridssDialogVisible(false);
    fetchHybridsData();
  };

  const hideDeleteProductsDialog = () => {
    setDeleteHybridssDialogVisible(false);
  };
  ///onchange to update the new value
  const handleChange = (fieldName, value) => {
    sethybrid(prevHybrid => ({
      ...prevHybrid,
      [fieldName]: value
    }));
  };
  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Hybrid'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveHybrid)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">
           
              <FormFields type="dropdown" id="cropId" label="Crop Name" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Select Crop'} value={hybrid.cropId}  optionsData={cropOptionsData} onChange={(e) =>handleChange("cropId", e.target.value)}  />

                <FormFields type="text" id="name" label="Hybrid Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter First name'} value={hybrid.name} onChange={(e) =>handleChange("name", e.target.value)} />

              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="code" label="Hybrid Code" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Last Name'} value={hybrid.code} onChange={(e) =>handleChange("code", e.target.value)} />

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
                    selectedValue={hybrid.status}
                    onChange={e => handleChange("status", e.target.value)}
                  />
                )}

 
              </div>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                <FormFields type="textarea" id="remarks" label="Remarks" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Pack Unit'} onChange={e => handleChange("remarks", e.target.value)} />

              </div>

             {/* //formfields */}
             <div className='flex justify-center items-center'>
                <Button type='submit' variant="filled" size="md" className='bg-primaryColor'>
                {isEditMode ? 'Update': 'Save'}
                </Button>
              </div>
            </form>
          </Modal>


          {/* ///delete modal component loading */}

          <DeleteModal
            visible={deleteHybridsDialogVisible}
            header="Confirm"
            hideDeleteProductsDialog={hideDeleteProductsDialog}
            handleDelete={handleDeleteHybrid}
            onHide={() => setDeleteHybridssDialogVisible(false)}
          />
        </div>
      </div>
    </>
  );
}

export default AddHybrid;

