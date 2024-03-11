import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { addRegion, getRegions, useGetZones } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import { DeleteModal } from "@/widgets/modal/deleteModal";



export function AddRegion() {

  let emptyRegion = {
    id: 0,
    name: '',
    zoneId: '',
    remarks: '',
    status: true
  };

  const [tableData, setTableData] = useState(null);
  const [showPopup, setShowPopup] = useState(false)
  const [region, setRegion] = useState(emptyRegion);
  const [zonesOptionsData, fetchZoneMasters] = useGetZones();
  const [deleteRegionsDialogVisible, setDeleteRegionsDialogVisible] = useState(false);
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [modalHeading, setmodalHeading] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);



  const tableColumns = [
    {
      'field': 'name',
      'header': "Region Name"
    },
    {
      'field': 'zone.name',
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


  //get all products api
  useEffect(() => {
    fetchRegionsData();
  }, []);

  const fetchRegionsData = async () => {
    try {
      const apiUrl = getRegions;
      const response = await ApiService.getData(apiUrl);
      setTableData(response.response.regionList);
    } catch (error) {
      console.error("Error fetching Region master data:", error);
    }
  };

  ///add new recrod 

  const handleAddNew = () => {
    setRegion(emptyRegion);
    fetchZoneMasters();
    setmodalHeading('Add Region');
    setShowPopup(true);
  }


  const saveRegion = async () => {
    const postData = region;
    const apiUrl = addRegion;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
    fetchRegionsData();
  }

  //On Edit/ update

    const handleEdit = (rowData) => {
      const updatedRegion = {
        ...emptyRegion,
        ...rowData,
        zoneId: rowData.zone.id
      };
      setRegion(updatedRegion);
      setmodalHeading('Edit Region');
      fetchZoneMasters();
      setIsEditMode(true);
      setShowPopup(true);
    }
 
  //on delete product

  const handleDelete = (rowData) => {

    // Create a new object with the relevant fields and set the status to false
    const updatedRegion = {
      id: rowData.id,
      name: rowData.name,
      remarks: rowData.remarks,
      zoneId: rowData.zone.id,
      status: false
    };

    setRegion(updatedRegion);
    ;

    // Set the delete modal visible
    setDeleteRegionsDialogVisible(true);

  }


  const handleDeleteRegion = async () => {
    const postData = region;
    const apiUrl = addRegion;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteRegionsDialogVisible(false);
    fetchRegionsData();
  };

  const hideDeleteRegionsDialog = () => {
    setDeleteRegionsDialogVisible(false);
  };
 

  ///onchange to update the new value

  const handleChange = (fieldName, value) => {
    setRegion(prevRegion => ({
      ...prevRegion,
      [fieldName]: value
    }));
  };


  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Region'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleDownload={true} handleUpload={true}/>
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveRegion)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                <FormFields type="dropdown" id="zoneId" label="Zone Name" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Select Zone'} selectedValue={region.zoneId} optionsData={zonesOptionsData} onChange={e => handleChange("zoneId", e.target.value)} />

                <FormFields type="text" id="name" label="Region Name" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Product name'} value={region.name} onChange={e => handleChange("name", e.target.value)} />


              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                <FormFields type="text" id="remarks" label="Remarks" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Remarks'} value={region.remarks} onChange={e => handleChange("remarks", e.target.value)} />


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
                    value={region.status}
                    selectedValue={region.status}
                    onChange={e => handleChange("status", e.target.value)}
                  />
                )}

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
            visible={deleteRegionsDialogVisible}
            header="Confirm"
            hideDeleteProductsDialog={hideDeleteRegionsDialog}
            handleDelete={handleDeleteRegion}
            item={region.name}
          />



          {/* ///delete modal component loading */}

        </div>
      </div>
    </>
  );
}

export default AddRegion;
