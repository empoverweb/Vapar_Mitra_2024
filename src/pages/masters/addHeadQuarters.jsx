import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { getHeadQuarters,addHeadQuarter,getTerritoryData } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import { DeleteModal } from "@/widgets/modal/deleteModal";

export function AddHeadQuarters() {

 // add new record

 let emptyHeadQuarters = {
  id: 0,
  name: '',
  territoryId:'',
  remarks: '',
  status: true
};

  const [tableData, setTableData] = useState(null);
  const [showPopup, setShowPopup] = useState(false)
  // const [product, setproduct] = useState(emptyHeadQuarters);
  const [headQuarters, setHeadQuarters]= useState(emptyHeadQuarters);
  const [modalHeading, setmodalHeading] = useState('');
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [deleteProductsDialogVisible, setDeleteProductsDialogVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [territoryOptionsData, fetchTerritoryMasters]=getTerritoryData();

  /////API CALL TO GET ALL THE HEAD QUARTERS

  const tableColumns = [
    {
      'field': 'name',
      'header': "Head Quarter Name"
    },
    {
      'field': 'territory.name',
      'header': "Territory Name"
    },
    // {
    //   'field': 'territory.region.name',
    //   'header': "Region Name"
    // },
    // {
    //   'field': 'territory.region.zone.name',
    //   'header': "Zone Name"
    // },
    {
      'field': 'remarks',
      'header': "Remarks"
    },
    {
      'field': 'status',
      'header': "Status"
    }
  ]

    const fetchHeadQuartersData = async () => {
      try {
        const apiUrl = getHeadQuarters;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.headQuartorsList);
      } catch (error) {
        console.error("Error fetching HeadQuarters Master data:", error);
      }
    };

    useEffect(()=>{
      fetchHeadQuartersData()
    },[headQuarters])
     
  const handleChange = (fieldName, value) => {
    setHeadQuarters(prevQuarters => ({
      ...prevQuarters,
      [fieldName]: value
    }));
  };

  const saveHeadQuarters =async () => {
    const postData = headQuarters;
    const apiUrl = addHeadQuarter;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
    fetchHeadQuartersData();
    setHeadQuarters(emptyHeadQuarters);
    setSubmitted(false);
    setShowPopup(false)
  }

  const handleAddNew = () => {
    setHeadQuarters(emptyHeadQuarters);
    setIsEditMode(false)
    fetchTerritoryMasters();
    setShowPopup(true);
    setmodalHeading("Add Head Quarter Master")
  }


  const handleDelete = (rowData) => {
    // Create a new object with the relevant fields and set the status to false
    const updatedHeaders = {
      id: rowData.id,
      name: rowData.name,
      territoryId:rowData.territory.id,
      remarks: rowData.remarks,
      status: false
    };
    setHeadQuarters(updatedHeaders);    
    // Set the delete modal visible
    setDeleteProductsDialogVisible(true);
  }

  const handleDeleteProduct = async () => { 
    const postData = headQuarters;
    const apiUrl = addHeadQuarter;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteProductsDialogVisible(false);
    fetchHeadQuartersData();
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialogVisible(false);
  };


  //On Edit/ update
  const handleEdit = (rowData) => {
    console.log(rowData,"selected row data of head quarters")
    const updatedHeaders = {
      ...emptyHeadQuarters,
      ...rowData,
      territoryId:rowData.territory.id

    };
    setIsEditMode(true);
    setHeadQuarters(updatedHeaders);
    fetchTerritoryMasters();
    setShowPopup(true)
    setmodalHeading("Edit Head Quarter Master")
  }

  //close the modal popup

  const hideDialog = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Head Quarters'} 
          tableData={tableData} 
          tableColumns={tableColumns}
          showActions={true}
          handleAddNew={handleAddNew} 
          handleEdit={handleEdit}
          handleDelete={handleDelete} 
          handleExport={true} 
          handleDownload={true} handleUpload={true}
          />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveHeadQuarters)}>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">
                <FormFields type="text"               
                label="Head Quarter Name" size="sm" color="teal"                
                error={true} 
                register={register} 
                errors={errors} 
                RequiredErrorMsg={'Enter Head Quarter Name'} 
                 value={headQuarters.name} 
                 onChange={e => handleChange("name", e.target.value)} 
                />
                <FormFields type="dropdown" id="territoryId" label="Territory Name" size="sm" 
                color="teal" error={true} register={register} errors={errors} 
                RequiredErrorMsg={'Enter Territory Name'}
                selectedValue={headQuarters.territoryId} 
                optionsData = {territoryOptionsData}
                onChange={e => handleChange("territoryId", e.target.value)} 
                 />
              </div>           

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">               
                <FormFields type="text" id="remarks" label="Remarks" size="sm" 
                color="teal" error={true} register={register} errors={errors} 
                RequiredErrorMsg={'Enter Remarks'}
                value={headQuarters.remarks} 
                onChange={e => handleChange("remarks", e.target.value)} 
                 />
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
                  onChange={e => handleChange("status", e.target.value)} 
                  selectedValue={headQuarters.status}
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

export default AddHeadQuarters;

