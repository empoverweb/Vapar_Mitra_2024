import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { addSeasons, getSeasons } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import { DeleteModal } from "@/widgets/modal/deleteModal";

export function AddSeasons() {

  let emptySeasons = {
    id: 0,
    name: '',
    remarks: '',
    status: true
  };

  const [tableData, setTableData] = useState(null);
  const [showPopup, setShowPopup] = useState(false)
  const [seasons, setSeasons] = useState(emptySeasons);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteHybridsDialogVisible, setDeleteHybridssDialogVisible] = useState(false);
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE SEASONS

  const tableColumns = [
    {
      'field': 'name',
      'header': "Season Name"
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
    const fetchSeasonsData = async () => {
      try {
        const fetchUrl = getSeasons;
        const response = await ApiService.getData(fetchUrl);
        setTableData(response.response.seasonList);
      } catch (error) {
        console.error("Error fetching Seasons Master data:", error);
      }
    };

    useEffect(() =>{
      fetchSeasonsData()
    },[seasons])
    
  // add new record

  const handleAddNew = () => {
    setSeasons(emptySeasons);
    setShowPopup(true)
    setIsEditMode(false)
    setmodalHeading('Add Product');
  }

  const saveProduct = async () => {
    const postData = seasons;
    const apiUrl = addSeasons;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
  fetchSeasonsData();
  }


  //On Edit/ update

  const handleEdit = (rowData) => {
    setShowPopup(true);
    setIsEditMode(true);
    setModalHeading('Edit Production Plants');
    const updatedProduct = {
      ...emptySeasons,
      ...rowData,
    };
    setSeasons(updatedProduct);
    fetchSeasonsData()
  }



  //on delete 

  const handleDelete = (rowData) => {
    const updatedHybrid = {
      id: rowData.id,
      name: rowData.name,
      remarks: rowData.remarks,
      status: false,
    };
    setSeasons(updatedHybrid);
 ;
    // Set the delete modal visible
    setDeleteHybridssDialogVisible(true);

  }
  
  const handleDeleteSeasons = async () => { 
    const postData = seasons;
    const apiUrl = addSeasons;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteHybridssDialogVisible(false);
    fetchSeasonsData();
  };


  //close the modal popup

  const hideDeleteProductsDialog = () => {
    setDeleteHybridssDialogVisible(false);
  };
  // on change
  const handleChange = (fieldName, value) => {
    setSeasons(prevProduct => ({
      ...prevProduct,
      [fieldName]: value
    }));
  };


  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Season'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New Season"}>
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">
                <FormFields type="text" id="name" label="Season Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Season name'} value={seasons.name} onChange={e => handleChange("name", e.target.value)}  />
                <FormFields type="text" id="remarks" label="Remarks" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Remarks'} value={seasons.remarks} onChange={e => handleChange("remarks", e.target.value)} />
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
                  selectedValue={seasons.status}
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
            visible={deleteHybridsDialogVisible}
            header="Confirm"
            hideDeleteProductsDialog={hideDeleteProductsDialog}
            handleDelete={handleDeleteSeasons}
            onHide={() => setDeleteHybridssDialogVisible(false)}
          />
        </div>
      </div>
    </>
  );
}

export default AddSeasons;

