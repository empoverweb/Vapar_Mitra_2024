import { ApiService } from "@/service";
import { addStates, getStates, useGetCountries, useGetZones } from "@/utils";
import { FormFields } from '@/widgets/FormFields';
import Modal from "@/widgets/modal";
import { DeleteModal } from "@/widgets/modal/deleteModal";
import PrimeDataTable from "@/widgets/primedatatable";
import { Button } from "@material-tailwind/react";
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export function AddState() {

  let emptyState = {
    id: 0,
    name: '',
    code: '',
    countryId: '',
    zoneId: '',
    remarks: '',
    status: true
  };

  const [tableData, setTableData] = useState(null); 
  const [showPopup, setShowPopup] = useState(false)
  const [state, setState] = useState(emptyState); 
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalHeading, setmodalHeading] = useState('');
  const [deleteStatesDialogVisible, setDeleteStatesDialogVisible] = useState(false);
  const [zonesOptionsData, fetchZonesMasters] = useGetZones();
  const [countryOptionsData, fetchcountryMasters] = useGetCountries();
  const toast = useRef(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE Crops

  const tableColumns = [
    {
      'field': 'name',
      'header': "State Name"
    },
    {
      'field': 'code',
      'header': "State Code"
    },
    {
      'field': 'zone.name',
      'header': "Zone Name"
    },
    {
      'field': 'country.name',
      'header': "Country Name"
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
  //get all states api
  useEffect(() => {
    fetchStatesData();
  }, [state]);


  const fetchStatesData = async () => {
    try {
      const apiUrl = getStates;
      console.log(apiUrl)
      const response = await ApiService.getData(apiUrl);
      setTableData(response.response.stateList);
    } catch (error) {
      console.error("Error fetching state master data:", error);
    }
  };

  ///add new recrod 

  const handleAddNew = () => {
    setState(emptyState);
    fetchZonesMasters();
    fetchcountryMasters();
    setmodalHeading('Add State');
    setShowPopup(true);
  }

  const saveState = async () => {
    const postData = state;
    const apiUrl = addStates;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
    fetchStatesData();
  }

  //On Edit/ update

  const handleEdit = (rowData) => {  
    const updatedState = {
      ...emptyState,
      ...rowData,
      zoneId: rowData.zone.id,
      countryId: rowData.country.id
    };
    setState(updatedState);
    fetchZonesMasters();
    fetchcountryMasters();
    setIsEditMode(true);
    setmodalHeading('Edit State');
    setShowPopup(true);
  }


  //on delete state

  const handleDelete = (rowData) => { 
    const updatedState = {
      id: rowData.id,
      name: rowData.name,
      code: rowData.code,
      countryId: rowData.country.id,
      zoneId: rowData.zone.id,
      remarks: rowData.remarks,
      status: false
    }; 
    setState(updatedState); 
    setDeleteStatesDialogVisible(true);

  }

  const handleDeleteState = async () => {
    const postData = state;
    const apiUrl = addStates;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteStatesDialogVisible(false);
    fetchStatesData();
  };

  const hideDeleteStatesDialog = () => {
    setDeleteStatesDialogVisible(false);
  };

  ///onchange to update the new value

  const handleChange = (fieldName, value) => {
    setState(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };



  return (
    <>
      <div className="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div className="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add State'}  tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleDownload={true} handleUpload={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveState)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">
               
                <FormFields type="dropdown" id="countryId" label="country Name" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Select country'} selectedValue={state.countryId} optionsData={countryOptionsData} onChange={e => handleChange("countryId", e.target.value)} />
               
                <FormFields type="dropdown" id="zoneId" label="zone Name" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Select zone'}  selectedValue={state.zoneId} optionsData={zonesOptionsData} onChange={e => handleChange("zoneId", e.target.value)} />
             
              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                <FormFields type="text" id="name" label="state Name" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter state Name'} value={state.name} selectedValue={state.name} onChange={e => handleChange("name", e.target.value)} />

                <FormFields type="number" id="code" label="state Code" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter state Code'} value={state.code} selectedValue={state.code} onChange={e => handleChange("code", e.target.value)} />

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
                    value={state.status}
                    selectedValue={state.status}
                    onChange={e => handleChange("status", e.target.value)}
                  />
                )}

              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                <FormFields type="textarea" id="remarks" label="Remarks" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Pack Unit'} value={state.remarks} onChange={e => handleChange("remarks", e.target.value)} />

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
            visible={deleteStatesDialogVisible}
            header="Confirm"
            hideDeleteStatesDialog={hideDeleteStatesDialog}
            handleDelete={handleDeleteState}
            item={state.name}
          />



          {/* ///delete modal component loading */}
        </div>
      </div>
    </>
  );
}

export default AddState;
